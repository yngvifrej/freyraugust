#!/bin/bash
set -e
cd "$(dirname "$0")"
mkdir -p models
if [ ! -s models/brain.glb ]; then
  echo "Downloading brain model..."
  curl -L --fail --retry 5 --retry-delay 2     "https://raw.githubusercontent.com/itayinbarr/brainproject/main/brain-atlas/models/brain.glb"     -o models/brain.glb
fi
printf "\nLocal site: http://localhost:8000\nPress Control-C to stop.\n\n"

# Fetch audio artwork for local preview if it has not been generated yet.
mkdir -p assets/audio
python3 - <<'PYART'
import json, pathlib, urllib.parse, urllib.request
out=pathlib.Path('assets/audio'); out.mkdir(parents=True, exist_ok=True)
tracks={
 '01.jpg':'https://soundcloud.com/furkaradio/effydd-furka-radio-131125',
 '02.jpg':'https://soundcloud.com/effydd/glitches-on-hyperbole-at-pandemonium',
 '04.jpg':'https://soundcloud.com/otg-distribution/b2-kai-noob-volodymyr-gnatenko',
}
headers={'User-Agent':'Mozilla/5.0 fri28aug-local-preview'}
for filename,track in tracks.items():
 p=out/filename
 if p.exists() and p.stat().st_size>0: continue
 try:
  endpoint='https://soundcloud.com/oembed?format=json&url='+urllib.parse.quote(track,safe='')
  with urllib.request.urlopen(urllib.request.Request(endpoint,headers=headers),timeout=20) as r: meta=json.load(r)
  art=(meta.get('thumbnail_url') or '').replace('http://','https://').replace('-large.','-t500x500.')
  if art:
   with urllib.request.urlopen(urllib.request.Request(art,headers=headers),timeout=20) as r: p.write_bytes(r.read())
 except Exception as e: print('Artwork warning:',filename,e)
PYART
if [ ! -s assets/audio/03.jpg ]; then
  curl -L --fail --retry 3 "https://static.common-ground.io/shops/6/items/1654858928/img-wxe7uk9Mu8.jpg" -o assets/audio/03.jpg || true
fi

python3 -m http.server 8000
