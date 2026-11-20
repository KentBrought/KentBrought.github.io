"""Update the gallery snapshots from the matching public YouTube videos."""
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import urlopen

path = Path(__file__).resolve().parents[1] / "src/video-views.json"
stats = json.loads(path.read_text())
for video_id, record in stats.items():
    try:
        with urlopen(f"https://www.youtube.com/watch?v={video_id}", timeout=20) as response:
            page = response.read().decode()
        marker = re.search(r"var ytInitialPlayerResponse\s*=\s*", page)
        if not marker:
            raise ValueError("player metadata unavailable")
        player, _ = json.JSONDecoder().raw_decode(page[marker.end():])
        details = player["videoDetails"]
        count = details["viewCount"]
        if details["videoId"] != video_id or not re.fullmatch(r"[0-9]+", count):
            raise ValueError("invalid video statistics")
        record.update(views=int(count), asOf=datetime.now(timezone.utc).date().isoformat())
        print(f"{video_id}: {count}")
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(f"{video_id}: keeping previous count ({error})")

path.write_text(json.dumps(stats, indent=2) + "\n")
