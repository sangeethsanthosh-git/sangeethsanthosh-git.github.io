"""Package original Flutter renders as small, linked browser walkthroughs."""
from pathlib import Path
import html
import json
import subprocess
import sys

from PIL import Image

root = Path(sys.argv[1])
output = Path(__file__).resolve().parents[1] / 'public/demos'
projects = {'rewind': 'rewind', 'chronicle': 'chronicle-journal', 'dayform': 'dayform'}
for name, repo in projects.items():
    captures = root / 'portfolio-native-renders' / name
    destination = output / name
    destination.mkdir(parents=True, exist_ok=True)
    pages = [p.stem for p in captures.glob('*.json')]
    for page in pages:
        metadata = json.loads((captures / (page + '.json')).read_text())
        image = Image.open(captures / (page + '.png')).convert('RGB')
        image.save(destination / (page + '.webp'), 'WEBP', quality=88, method=6)
        links = []
        for target in metadata['targets']:
            if target['target'] not in pages:
                continue
            width = max(44, target['width'])
            height = max(44, target['height'])
            x = max(0, min(390 - width, target['x'] - (width - target['width']) / 2))
            y = max(0, min(680 - height, target['y'] - (height - target['height']) / 2))
            style = f'left:{x / 390 * 100:.3f}%;top:{y / 680 * 100:.3f}%;width:{width / 390 * 100:.3f}%;height:{height / 680 * 100:.3f}%'
            links.append(f'<a class="native-hotspot" href="./{target["target"]}.html" aria-label="{html.escape(target["label"])}" title="{html.escape(target["label"])}" style="{style}"></a>')
        for field in metadata.get('fields', []):
            rect = f'left:{field["x"] / 390 * 100:.3f}%;top:{field["y"] / 680 * 100:.3f}%;width:{field["width"] / 390 * 100:.3f}%;height:{field["height"] / 680 * 100:.3f}%;font-size:min({field["fontSize"]}px,{field["fontSize"] / 390 * 100:.3f}vw)'
            tag = 'textarea' if field['multiline'] else 'input'
            hint = html.escape(field['hint'])
            if tag == 'textarea':
                links.append(f'<textarea class="native-field" aria-label="{hint}" placeholder="{hint}" style="{rect}"></textarea>')
            else:
                links.append(f'<input class="native-field" aria-label="{hint}" placeholder="{hint}" style="{rect}">')
        # Every native screen also offers an accessible route back into the walkthrough.
        if page not in ['index']:
            links.append('<a class="native-return" href="./index.html" aria-label="Return to app home"></a>')
        title = name.title() + ' — ' + page.title()
        doc = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title><link rel="stylesheet" href="../native-preview.css"></head>
<body class="native-{name}" data-native-project="{name}"><main class="native-screen" aria-label="Original {name.title()} screen">
<img src="./{page}.webp" alt="Original {name.title()} {page} screen, rendered from its Flutter widgets with demo data" width="585" height="1020" draggable="false">{''.join(links)}</main>
<nav class="native-accessible-nav" aria-label="Other app screens">{''.join(f'<a href="./{p}.html">{p.title()}</a>' for p in pages)}</nav>
<script src="../native-preview.js" defer></script></body></html>'''
        (destination / (page + '.html')).write_text(doc, encoding='utf-8')
    source = root / ('portfolio-native-' + repo)
    sha = subprocess.check_output(['git', '-C', str(source), 'rev-parse', 'HEAD'], text=True).strip()
    (destination / 'source.json').write_text(json.dumps({
        'repository': 'https://github.com/sangeethsanthosh-git/' + repo, 'commit': sha,
        'pages': [p + '.html' for p in pages], 'renderer': 'Original Flutter widgets, captured locally at 390 × 680',
        'adaptations': ['In-memory demo data and disabled native service calls',
                        'Local fonts and disabled page transitions during capture',
                        'Chronicle editor toolbar width constraint corrected for capture',
                        'WebP screen images with accessible navigation hotspots; no Flutter runtime'],
    }, indent=2) + '\n', encoding='utf-8')
    print(name + ': ' + str(len(pages)) + ' original screens packaged')
