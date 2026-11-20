"""Update the gallery snapshots from the matching public YouTube videos."""
import json
import re
from datetime import date, datetime, timezone
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import urlopen

path = Path(__file__).resolve().parents[1] / "src/video-views.json"
stats = json.loads(path.read_text())
# Start with the last deployed snapshot so a temporary YouTube failure cannot
# roll a video's count back to the snapshot shipped in the source tree.
try:
    with urlopen("https://kentbrought.github.io/video-views.json", timeout=20) as response:
        previous = json.load(response)
except HTTPError as error:
    if error.code != 404:
        raise
    previous = {}  # First deployment with a public snapshot.

for video_id, record in stats.items():
    cached = previous.get(video_id)
    if (cached and type(cached.get("views")) is int and cached["views"] >= 0
            and date.fromisoformat(cached["asOf"]) >= date.fromisoformat(record["asOf"])):
        record.update(cached)

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
