"""Bake the timeline's static chiaroscuro pools into lightweight WebP textures."""

from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter


WIDTH = 1600
HEIGHT = 1500
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "public" / "lighting"


def ellipse_mask(cx, cy, rx, ry, opacity, blur):
    layer = Image.new("L", (WIDTH, HEIGHT), 0)
    draw = ImageDraw.Draw(layer)
    draw.ellipse(
        (
            int((cx - rx) * WIDTH),
            int((cy - ry) * HEIGHT),
            int((cx + rx) * WIDTH),
            int((cy + ry) * HEIGHT),
        ),
        fill=opacity,
    )
    return layer.filter(ImageFilter.GaussianBlur(blur))


def build_texture(name, tone, pools, cutouts):
    alpha = Image.new("L", (WIDTH, HEIGHT), 0)

    for pool in pools:
        alpha = ImageChops.add(alpha, ellipse_mask(*pool))

    for cutout in cutouts:
        alpha = ImageChops.subtract(alpha, ellipse_mask(*cutout))

    # Use a real alpha ramp at the image boundaries. The previous oversized
    # ellipse remained opaque at the canvas edge, revealing the texture boxes.
    vertical_values = []
    vertical_fade = HEIGHT * 0.24
    for y in range(HEIGHT):
        strength = min(1.0, y / vertical_fade, (HEIGHT - 1 - y) / vertical_fade)
        vertical_values.append(round(max(0.0, strength) * 255))
    vertical = Image.new("L", (1, HEIGHT))
    vertical.putdata(vertical_values)
    vertical = vertical.resize((WIDTH, HEIGHT))

    horizontal_values = []
    horizontal_fade = WIDTH * 0.07
    for x in range(WIDTH):
        strength = min(1.0, x / horizontal_fade, (WIDTH - 1 - x) / horizontal_fade)
        horizontal_values.append(round(max(0.0, strength) * 255))
    horizontal = Image.new("L", (WIDTH, 1))
    horizontal.putdata(horizontal_values)
    horizontal = horizontal.resize((WIDTH, HEIGHT))

    alpha = ImageChops.multiply(alpha, ImageChops.multiply(vertical, horizontal))

    texture = Image.new("RGBA", (WIDTH, HEIGHT), (*tone, 0))
    texture.putalpha(alpha)
    texture.save(OUTPUT_DIR / name, "WEBP", quality=78, method=6, exact=True)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    build_texture(
        "future-chiaroscuro.webp",
        (205, 211, 214),
        pools=[
            (0.12, 0.12, 0.42, 0.12, 19, 88),
            (0.78, 0.20, 0.30, 0.18, 13, 105),
            (0.42, 0.43, 0.50, 0.09, 15, 92),
            (0.94, 0.62, 0.25, 0.20, 14, 110),
            (0.24, 0.79, 0.34, 0.16, 12, 98),
            (0.68, 0.94, 0.48, 0.08, 14, 86),
        ],
        cutouts=[
            (0.30, 0.22, 0.23, 0.08, 9, 70),
            (0.70, 0.52, 0.28, 0.12, 8, 82),
            (0.08, 0.93, 0.22, 0.10, 9, 75),
        ],
    )

    build_texture(
        "mit-chiaroscuro.webp",
        (214, 214, 211),
        pools=[
            (0.86, 0.08, 0.34, 0.13, 14, 100),
            (0.18, 0.24, 0.30, 0.20, 13, 112),
            (0.58, 0.38, 0.48, 0.08, 17, 88),
            (0.06, 0.56, 0.25, 0.16, 15, 104),
            (0.82, 0.68, 0.33, 0.19, 13, 110),
            (0.38, 0.86, 0.46, 0.10, 16, 92),
        ],
        cutouts=[
            (0.65, 0.19, 0.20, 0.11, 8, 72),
            (0.34, 0.54, 0.31, 0.10, 10, 82),
            (0.88, 0.90, 0.24, 0.09, 8, 76),
        ],
    )

    build_texture(
        "origins-chiaroscuro.webp",
        (204, 199, 192),
        pools=[
            (0.08, 0.10, 0.38, 0.14, 17, 94),
            (0.70, 0.20, 0.42, 0.09, 13, 86),
            (0.30, 0.40, 0.32, 0.19, 15, 108),
            (0.94, 0.55, 0.28, 0.15, 14, 102),
            (0.15, 0.72, 0.29, 0.14, 13, 100),
            (0.66, 0.89, 0.50, 0.09, 15, 88),
        ],
        cutouts=[
            (0.50, 0.12, 0.24, 0.08, 8, 70),
            (0.14, 0.49, 0.18, 0.13, 9, 78),
            (0.72, 0.72, 0.30, 0.11, 9, 82),
        ],
    )

    for path in sorted(OUTPUT_DIR.glob("*-chiaroscuro.webp")):
        print(f"{path.name}: {path.stat().st_size / 1024:.1f} KiB")


if __name__ == "__main__":
    main()
