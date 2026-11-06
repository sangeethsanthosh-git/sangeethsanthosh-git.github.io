"""Export the original Kerala Tourism Jinja templates for the static portfolio.

Usage: python scripts/export-kerala-preview.py PATH_TO_KERALA_REPO
Requires jinja2 locally; no Python is needed by the deployed portfolio.
"""
import importlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import types

from jinja2 import Environment, FileSystemLoader, StrictUndefined, select_autoescape

source = Path(sys.argv[1]).resolve()
output = Path(__file__).resolve().parents[1] / 'public/demos/kerala'
output.mkdir(parents=True, exist_ok=True)
package = types.ModuleType('kerala_source')
package.__path__ = [str(source / 'backend')]
sys.modules['kerala_source'] = package
content = importlib.import_module('kerala_source.content')
pages = {'home': 'index.html', 'destinations': 'destinations.html',
         'about': 'about.html', 'contact': 'contact.html'}

def url_for(endpoint, **kwargs):
    if endpoint == 'static':
        return './static/' + kwargs['filename']
    return './' + pages[endpoint]

env = Environment(loader=FileSystemLoader(source / 'templates'),
                  autoescape=select_autoescape(['html']), undefined=StrictUndefined)
env.globals['url_for'] = url_for
for page, filename in pages.items():
    html = env.get_template(page + '.html').render(
        page_key=page, **getattr(content, page.upper() + '_CONTENT'))
    # Original hero content has one route stored as data rather than url_for.
    html = html.replace('href="/destinations"', 'href="./destinations.html"')
    html = re.sub(r'<script src="https://cdn.tailwindcss.com"></script>\s*<script>.*?</script>',
                  '<link rel="stylesheet" href="./preview-tailwind.css">', html, count=1, flags=re.S)
    html = html.replace('https://unpkg.com/aos@next/dist/aos.css', './vendor/aos.css')
    html = html.replace('https://unpkg.com/aos@next/dist/aos.js', './vendor/aos.js')
    html = re.sub(r'<link[^>]+(?:preconnect|fonts.googleapis.com|fonts.gstatic.com)[^>]*>', '', html)
    html = html.replace('</head>', '<link rel="stylesheet" href="../fonts.css"></head>')
    html = html.replace('</head>', '<link rel="stylesheet" href="./preview-responsive.css"></head>')
    html = html.replace('setInterval(() => {', "setInterval(() => {\n            if (document.hidden || document.documentElement.dataset.previewPaused === 'true' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;")
    html = html.replace('</body>', '<script src="../preview-visibility.js" defer></script></body>')
    if page == 'contact':
        html = html.replace('</body>', '<script src="./preview-contact.js"></script></body>')
    (output / filename).write_text(html, encoding='utf-8')
shutil.copytree(source / 'static', output / 'static', dirs_exist_ok=True)
(output / 'preview-contact.js').write_text('''document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  let notice = document.getElementById('preview-notice');
  if (!notice) {
    notice = document.createElement('p');
    notice.id = 'preview-notice'; notice.setAttribute('role', 'status');
    notice.style.cssText = 'padding:20px;border-radius:16px;background:#173a2e;color:white;line-height:1.7';
    event.target.append(notice);
  }
  notice.textContent = 'Demo complete. In the full app, Flask saves this enquiry to CSV. Nothing was sent or stored in this preview.';
  notice.scrollIntoView({behavior:'smooth', block:'center'});
});
''', encoding='utf-8')
sha = subprocess.check_output(['git', '-C', str(source), 'rev-parse', 'HEAD'], text=True).strip()
(output / 'source.json').write_text(json.dumps({
    'repository': 'https://github.com/sangeethsanthosh-git/kerala-tourism',
    'commit': sha, 'pages': list(pages.values()),
    'adaptations': ['Static route URLs', 'Compiled original Tailwind configuration',
                    'Contact submission handled locally without persistence',
                    'Narrow viewport spacing and typography overrides']
}, indent=2) + '\n', encoding='utf-8')
print('Exported original Kerala Tourism pages at commit ' + sha)
