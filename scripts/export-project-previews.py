"""Export original server-rendered project UIs with public demo data only.

Usage: python scripts/export-project-previews.py SOURCE_ROOT
Source checkouts use the portfolio-source-* names recorded in demos/README.md.
No Python, model files, account data or databases are shipped to the browser.
"""
import ast
import base64
import hashlib
import importlib.util
import json
import re
import shutil
import subprocess
import sys
from datetime import datetime
from io import BytesIO
from pathlib import Path
from types import SimpleNamespace as NS

from jinja2 import Environment, FileSystemLoader, StrictUndefined, select_autoescape
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCES = Path(sys.argv[1])
OUT = ROOT / 'public/demos'


def write_preview(project, filename, html, routes):
    folder = OUT / project
    folder.mkdir(parents=True, exist_ok=True)
    # Backend calls are replaced by the small local demo controller.
    html = re.sub(r'<script\b[^>]*>.*?</script>', '', html, flags=re.S | re.I)
    html = re.sub(r'\s+on(?:submit|click|change)="[^"]*"', '', html)
    html = re.sub(r'\s+action="[^"]*"', '', html)
    for route, target in sorted(routes.items(), key=lambda x: -len(x[0])):
        html = html.replace('href="' + route + '"', 'href="./' + target + '"')
    html = html.replace('src="/static/', 'src="./static/')
    html = html.replace('href="/static/', 'href="./static/')
    html = html.replace("url('/static/", "url('./static/")
    html = html.replace('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', '../vendor/bootstrap.min.css')
    html = html.replace('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css', '../vendor/fontawesome.min.css')
    html = html.replace('</head>', '<link rel="stylesheet" href="../preview-common.css"></head>')
    html = html.replace('<body', f'<body data-demo-project="{project}" data-demo-page="{filename}"', 1)
    html = html.replace('</body>', '<script src="../preview-common.js" defer></script></body>')
    # Make the browser preview self-contained: don't ship source analytics or trackers.
    html = re.sub(r'<link[^>]+(?:preconnect|fonts.googleapis.com|fonts.gstatic.com)[^>]*>', '', html)
    (folder / filename).write_text(html, encoding='utf-8')


def copy_assets(project, source):
    target = OUT / project / 'static'
    target.mkdir(parents=True, exist_ok=True)
    for p in source.rglob('*'):
        if not p.is_file() or p.suffix.lower() not in {'.css', '.svg', '.woff', '.woff2', '.png', '.jpg', '.webp'}:
            continue
        dest = target / p.relative_to(source)
        dest.parent.mkdir(parents=True, exist_ok=True)
        if p.stat().st_size < 500_000:
            shutil.copy2(p, dest)


def manifest(project, source, repo, pages):
    sha = subprocess.check_output(['git', '-C', str(source), 'rev-parse', 'HEAD'], text=True).strip()
    (OUT / project / 'source.json').write_text(json.dumps({
        'repository': 'https://github.com/sangeethsanthosh-git/' + repo,
        'commit': sha, 'pages': pages,
        'adaptations': ['Static route URLs', 'Public sample data only',
                        'Local demo controller; no backend calls', 'Narrow viewport CSS overrides'],
    }, indent=2) + '\n', encoding='utf-8')


def environment(source, project, routes):
    env = Environment(loader=FileSystemLoader(source), autoescape=select_autoescape(['html']), undefined=StrictUndefined)
    def url_for(endpoint, **kwargs):
        if endpoint == 'static':
            return './static/' + kwargs['filename']
        return './' + routes.get(endpoint, endpoint + '.html')
    env.globals.update(url_for=url_for, get_flashed_messages=lambda **kwargs: [])
    env.filters['currency'] = lambda n: '₹{:,.2f}'.format(float(n or 0))
    env.filters['signed_pct'] = lambda n: '{:+.1f}%'.format(float(n or 0))
    return env


def export_vault():
    source = SOURCES / 'portfolio-source-file-integrity'
    routes = {'dashboard': 'dashboard.html', 'upload_file': 'upload.html', 'verify_file': 'verify.html',
              'file_history': 'history.html', 'history': 'history.html', 'logout': 'login.html'}
    env = environment(source / 'templates', 'vault', routes)
    fingerprint = hashlib.sha256(b'Portfolio demonstration document').hexdigest()
    tracked = dict(id=1, file_name='demo-document.txt', upload_time='Demo record', hash_display=fingerprint,
                   status_class='verified', status_text='Original saved', last_checked='Demo record')
    pages = ['login', 'register', 'dashboard', 'upload', 'verify', 'history']
    for page in pages:
        html = env.get_template(page + '.html').render(
            g=NS(user=None if page in ['login', 'register'] else NS(username='Demo visitor')),
            request=NS(form={}), stats=NS(total_files=1, verified_files=1, modified_files=0),
            files=[tracked], tracked_file=tracked, feedback=None, recent_history=[], history_entries=[])
        write_preview('vault', page + '.html', html, {})
    copy_assets('vault', source / 'static')
    manifest('vault', source, 'file-integrity', [p + '.html' for p in pages])


def export_budget():
    source = SOURCES / 'portfolio-source-ai-budget-planner'
    routes = {'index': 'index.html', 'logout': 'login.html', 'add_expense': 'expense_form.html',
              'edit_expense': 'expense_form.html', 'delete_expense': 'expenses.html',
              'export_expenses': 'sample-transactions.csv'}
    env = environment(source / 'templates', 'budget', routes)
    records = [dict(id=i + 1, display_date='Demo month', category=c, amount=a,
                    entry_type='Expense', payment_mode='UPI') for i, (c, a) in enumerate([
                        ('Food', 850), ('Transport', 300), ('Utilities', 1200)])]
    series = [dict(label=m, total=v) for m, v in [('Jun', 1900), ('Jul', 2600), ('Aug', 2350), ('Sep', 3100), ('Oct', 2350)]]
    snapshot = dict(monthly_budget=5000, status='Within budget', current_month_total=2350,
                    status_tone='positive', has_budget=True, progress_percent=47, remaining=2650)
    summary = dict(monthly_series=series, total_expense=2350, balance=2650, budget_snapshot=snapshot)
    pages = {'index': 'welcome', 'login': 'login', 'signup': 'signup', 'dashboard': 'dashboard',
             'expenses': 'expenses', 'expense_form': 'expense_form', 'forecast': 'forecast', 'analysis': 'analysis'}
    values = dict(date='2026-11-01', category='Food', payment_mode='UPI', amount='')
    for page, template in pages.items():
        html = env.get_template(template + '.html').render(
            current_user=None if page in ['index', 'login', 'signup'] else NS(username='Demo visitor'),
            request=NS(endpoint=page), allowed_categories=['Food', 'Transport', 'Utilities', 'Shopping', 'Income'],
            payment_modes=['UPI', 'Cash', 'Card'], demo_available=True, quick_form_values=values,
            form_values=values, form_mode='add', user_summary=summary, records=records, monthly_series=series,
            dashboard_forecast=dict(success=False), forecast_result=dict(success=False),
            analysis=dict(best_model=dict(name=None, mape=None), forecast_result=dict(success=False),
                          daily_point_count=0, record_count=3, comparison_rows=[],
                          charts=dict(correlation_heatmap=None, covariance_heatmap=None, nrmse_comparison=None, model_charts=[])),
            ai_insights=['Sample transactions illustrate the original interface. Model forecasts run in the full app.'])
        write_preview('budget', page + '.html', html, {})
    copy_assets('budget', source / 'static')
    (OUT / 'budget/sample-transactions.csv').write_text('category,amount\nFood,850\nTransport,300\nUtilities,1200\n', encoding='utf-8')
    manifest('budget', source, 'ai-budget-planner', [p + '.html' for p in pages])


def export_traffic():
    source = SOURCES / 'portfolio-source-website-traffic-analyzer'
    spec = importlib.util.spec_from_file_location('traffic_preview_source', source / 'app.py')
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    routes = {'dashboard': 'index.html', 'logout': 'login.html'}
    env = environment(source / 'traffic_analyzer/templates', 'traffic', routes)
    records = module.load_traffic_dataset()
    benchmarks = module.load_website_benchmark_dataset()
    context = dict(config=NS(APP_NAME='Website Traffic Analyzer'), request=NS(endpoint='dashboard'),
                   is_logged_in=True, current_username='Demo visitor', records=records,
                   summary=module.build_summary(records), traffic_dataset_ready=True, traffic_dataset_error=None,
                   traffic_dataset_filename='Traffic.csv', chart_image=module.generate_chart(records),
                   benchmark_records=benchmarks, benchmark_error=None, benchmark_filename='top_websites_worldwide_feb_2025.csv',
                   benchmark_query='', benchmark_summary=module.build_website_benchmark_summary(benchmarks),
                   benchmark_search=module.blank_search(), benchmark_display_records=benchmarks,
                   benchmark_chart_image=module.generate_website_benchmark_chart(benchmarks), benchmark_focus_chart=None)
    html = env.get_template('index.html').render(**context)
    # Convert the original generated chart data into cached, compressed image files.
    def image(match):
        data = base64.b64decode(match[1])
        name = hashlib.sha256(data).hexdigest()[:12] + '.webp'
        dest = OUT / 'traffic/static' / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        Image.open(BytesIO(data)).save(dest, 'WEBP', quality=85)
        return './static/' + name
    html = re.sub(r'data:image/png;base64,([A-Za-z0-9+/=]+)', image, html)
    write_preview('traffic', 'index.html', html, {})
    write_preview('traffic', 'login.html', env.get_template('login.html').render(
        config=NS(APP_NAME='Website Traffic Analyzer'), request=NS(endpoint='login'),
        is_logged_in=False, active_form='login', username=''), {})
    copy_assets('traffic', source / 'traffic_analyzer/static')
    manifest('traffic', source, 'website-traffic-analyzer', ['index.html', 'login.html'])


def export_edusense():
    source = SOURCES / 'portfolio-source-Edusense'
    routes = {'/': 'index.html', '/history': 'history.html', '/chat/1': 'chat.html', '/assistant/1': 'index.html',
              '/#lecture-mode': 'index.html#lecture-mode', '/live_transcript': 'live_transcript.html'}
    env = environment(source / 'templates', 'edusense', {})
    session = dict(id=1, title='Sample lecture', output_language='en', updated_at=datetime(2026, 11, 1),
                   transcript='A sample lecture transcript is used to demonstrate the study interface.')
    for page in ['index', 'history', 'chat', 'live_transcript']:
        html = env.get_template(page + '.html').render(
            sidebar_sessions=[session], sessions=[session], session=session, messages=[
                dict(role='user', content='Show how lecture notes appear.', spoken_content='', provider=''),
                dict(role='assistant', content='This is sample content showing the original chat design. AI generation runs in the full app.', spoken_content='', provider='Demo')],
            task_value='summarize', question_value='', output_language='en', text_value='', result=None)
        write_preview('edusense', page + '.html', html, routes)
    manifest('edusense', source, 'Edusense', ['index.html', 'history.html', 'chat.html', 'live_transcript.html'])


def export_cartoon():
    source = SOURCES / 'portfolio-cartoonizer-source'
    env = environment(source / 'templates', 'cartoon', {})
    folder = OUT / 'cartoon/static/sample_images'
    folder.mkdir(parents=True, exist_ok=True)
    # The repo includes a still of its own background; skip the 13MB animated GIF.
    shutil.copy2(source / 'static/sample_images/background.jpg', folder / 'background.jpg')
    for page, output in [('index', None), ('result', './sample-output.webp')]:
        html = env.get_template('index_cartoonized.html').render(cartoonized_image=output)
        html = html.replace('background.gif', 'background.jpg')
        html = html.replace('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css', './tailwind.css')
        html = html.replace('type="file" id="hiddeninputfile"', 'type="file" id="hiddeninputfile"')
        write_preview('cartoon', page + '.html', html, {})
    # Display the actual result saved in the repository, never a fake JS filter.
    candidates = list((source / 'static/cartoonized_outputs').glob('*.jpg'))
    if candidates:
        Image.open(candidates[0]).save(OUT / 'cartoon/sample-output.webp', 'WEBP', quality=85)
    else:
        # The repository's output screenshot remains a faithful sample when no raw output is committed.
        Image.open(source / 'assets/output.png').crop((651, 373, 1251, 973)).save(
            OUT / 'cartoon/sample-output.webp', 'WEBP', quality=85)
    manifest('cartoon', source, 'Cartoonizer', ['index.html', 'result.html'])


def export_pcod():
    import types
    from django.conf import settings
    if not settings.configured:
        settings.configure(USE_I18N=False, USE_TZ=False, STATIC_URL='./static/', INSTALLED_APPS=[])
    import django
    django.setup()
    from django import template
    from django.template import Context, Engine
    source = SOURCES / 'portfolio-source-PCOD-Detection-System'
    project = source / 'pcos_project'
    tags = types.ModuleType('preview_template_tags')
    tags.register = template.Library()
    @tags.register.simple_tag(name='url')
    def static_url(name, *args, **kwargs):
        return './' + ('index' if name == 'home' else name) + '.html'
    sys.modules[tags.__name__] = tags
    engine = Engine(dirs=[str(project / 'templates')], libraries={'static': 'django.templatetags.static'},
                    builtins=[tags.__name__])
    # Read original form definitions without importing model loaders or running inference.
    import typing
    namespace = {'Any': typing.Any}
    tree = ast.parse((project / 'services/predictor_service.py').read_text(encoding='utf-8'))
    names = {'MODE_BASIC', 'MODE_CLINICAL', 'MODE_OPTIONS', 'BOOLEAN_CHOICES', 'STRESS_CHOICES',
             'ACTIVITY_CHOICES', 'STEP_DEFINITIONS', 'FIELD_DEFINITIONS'}
    nodes = [node for node in tree.body if (isinstance(node, ast.Assign) and isinstance(node.targets[0], ast.Name)
             and node.targets[0].id in names) or (isinstance(node, ast.FunctionDef) and node.name == 'build_prediction_form_context')]
    exec(compile(ast.Module(body=nodes, type_ignores=[]), '<original form definitions>', 'exec'), namespace)
    form = namespace['build_prediction_form_context']()
    pages = ['home', 'predict', 'result', 'analysis', 'doctors', 'education', 'search']
    for page in pages:
        context = dict(active_nav=page, stats=dict(prediction_accuracy='—', patients_analyzed=0, high_risk_cases=0, recent_predictions=0),
                       articles=[], faq_items=[], last_prediction={}, probability=0, gauge_risk_label='No assessment',
                       prediction_modes=form['mode_options'], prediction_steps=form['steps'], selected_mode=form['selected_mode'],
                       sample_locations=['Mumbai', 'Delhi', 'Bangalore', 'Chennai'], google_maps_browser_key='')
        html = engine.get_template(page + '.html').render(Context(context))
        write_preview('pcod', ('index' if page == 'home' else page) + '.html', html, {})
    copy_assets('pcod', project / 'static')
    manifest('pcod', source, 'PCOD-Detection-System', [('index' if p == 'home' else p) + '.html' for p in pages])


if __name__ == '__main__':
    for exporter in [export_vault, export_budget, export_traffic, export_edusense, export_cartoon, export_pcod]:
        exporter()
        print(exporter.__name__ + ': original UI exported', flush=True)
