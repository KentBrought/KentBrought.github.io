param(
    [string]$PublicDir = (Join-Path $PSScriptRoot '..\public'),
    [int]$MaxDimension = 1920,
    [int]$StaticQuality = 80,
    [int]$AnimationCrf = 34,
    [int]$AnimationFps = 12
)

$ErrorActionPreference = 'Stop'

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    throw 'ffmpeg is required but was not found on PATH.'
}

$resolvedPublicDir = (Resolve-Path -LiteralPath $PublicDir).Path
$sourceExtensions = @('.png', '.jpg', '.jpeg', '.jfif', '.gif')
$sources = Get-ChildItem -LiteralPath $resolvedPublicDir -Recurse -File |
    Where-Object { $sourceExtensions -contains $_.Extension.ToLowerInvariant() }

foreach ($source in $sources) {
    $isAnimation = $source.Extension.Equals('.gif', [System.StringComparison]::OrdinalIgnoreCase)
    $destinationExtension = if ($isAnimation) { '.webm' } else { '.webp' }
    $destination = [System.IO.Path]::ChangeExtension($source.FullName, $destinationExtension)
    if ((Test-Path -LiteralPath $destination) -and
        ((Get-Item -LiteralPath $destination).LastWriteTimeUtc -ge $source.LastWriteTimeUtc)) {
        continue
    }

    $scaleFilter = "scale='min($MaxDimension,iw)':'min($MaxDimension,ih)':force_original_aspect_ratio=decrease:flags=lanczos"

    if ($isAnimation) {
        & ffmpeg -hide_banner -loglevel error -y -i $source.FullName `
            -vf "fps=$AnimationFps,$scaleFilter" -an -c:v libvpx-vp9 `
            -crf $AnimationCrf -b:v 0 -deadline good -cpu-used 4 -row-mt 1 `
            -pix_fmt yuv420p $destination
    } else {
        & ffmpeg -hide_banner -loglevel error -y -i $source.FullName `
            -vf $scaleFilter -frames:v 1 -c:v libwebp `
            -quality $StaticQuality -compression_level 6 $destination
    }

    if ($LASTEXITCODE -ne 0) {
        throw "Failed to optimize $($source.FullName)"
    }
}

$originalBytes = ($sources | Measure-Object -Property Length -Sum).Sum
$optimizedFiles = Get-ChildItem -LiteralPath $resolvedPublicDir -Recurse -File |
    Where-Object { $_.Extension -in @('.webp', '.webm') }
$optimizedBytes = ($optimizedFiles | Measure-Object -Property Length -Sum).Sum

[pscustomobject]@{
    ConvertedFiles = $sources.Count
    OriginalMB = [math]::Round($originalBytes / 1MB, 2)
    OptimizedMB = [math]::Round($optimizedBytes / 1MB, 2)
    ReductionPercent = [math]::Round((1 - ($optimizedBytes / $originalBytes)) * 100, 1)
}
