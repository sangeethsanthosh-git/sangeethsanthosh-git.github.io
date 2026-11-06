# Portfolio project previews

These assets are static snapshots of the portfolio owner's project repositories.
They need no Python server, model weights, database, or API keys at runtime.

## Kerala Tourism

`kerala/` contains the original home, destinations, heritage, and contact pages,
rendered from the repository's Jinja templates and content, with its local images.
The original responsive layout, inline styles, navigation, and slideshow are retained.
`preview-responsive.css` adjusts typography, spacing, navigation, and forms below
480px so the pages fit the embedded phone viewport.
The enquiry form displays a local demo acknowledgement; it sends and stores nothing.
`kerala/source.json` records the source repository, commit, and adaptations.
Fonts, AOS and Tailwind are served locally. The slideshow and gallery pause when
the preview leaves the viewport, and respect reduced-motion preferences.

To refresh from a local clone of `sangeethsanthosh-git/kerala-tourism`:

```powershell
python scripts/export-kerala-preview.py PATH_TO_KERALA_REPO
npm exec --yes --package=tailwindcss@3.4.19 -- tailwindcss --config scripts/kerala-tailwind.config.cjs --input scripts/kerala-tailwind.css --output public/demos/kerala/preview-tailwind.css --minify
```

The export helper requires Jinja2 on the development machine. Python and Tailwind's
CLI are export tools only; deployment uses the generated HTML/CSS and assets.

## Original project UIs

`vault/`, `budget/`, `traffic/`, `edusense/`, `cartoon/` and `pcod/` contain static
exports of the original Jinja or Django templates, with local styles and fonts.
Traffic charts are generated at export time by the original repository's dataset
and chart functions, then compressed to WebP. No data analysis runs on a visitor's device.

`gistify/` contains the original rendered Next.js UI captured as static
HTML/CSS. They ship no Next.js or React runtime. Navigation and backend-dependent
controls use the shared small demo controller and clearly identified sample data.
The original project identity, content, layouts, and colours are retained; mobile
overrides make desktop-only grids usable inside the phone.

Every project folder includes `source.json` with its repository commit and export
adaptations. `preview-common.js` never uploads files, stores accounts, executes
models, or makes payments. Heavy source GIFs are replaced with stills from the
same project. Old `repo-screens/` assets are retained for reference but never
requested by the app.

Export the Python/Django project UIs from the development checkouts:

```powershell
python scripts/export-project-previews.py SOURCE_ROOT
```

`SOURCE_ROOT` contains the `portfolio-source-*` checkouts and
`portfolio-cartoonizer-source`. The helper requires the local template and chart
libraries (Jinja2, Django, Pillow, Flask, NumPy, Matplotlib). These are development
tools only and are not portfolio dependencies.

To refresh the Next.js snapshots, start the original Gistify frontend on port 3011,
then run:

```powershell
node scripts/capture-next-previews.cjs PATH_TO_PLAYWRIGHT_MODULE SOURCE_ROOT
```

The shared font and vendor CSS files are checked in. The Cartoonizer preview uses
the original background still and a sample image extracted from its repository's
output screenshot, rather than re-running TensorFlow.

## Runtime performance

Only the selected app is mounted. App code is imported on demand and only one
website iframe exists at a time. Closing a preview unmounts it. No preview HTML,
fonts, chart libraries, model weights or images are requested by the home screen.
Shared local fonts and styles are cached between projects. Desktop ASCII drawing
is capped at 20 frames per second and stops while offscreen or in a hidden tab;
it is disabled on small screens and for reduced-motion preferences.

## Rewind, Chronicle, Dayform and AURA

`rewind/`, `chronicle/` and `dayform/` contain 19 screens rendered locally from the
original Flutter widget trees with in-memory demo data. They are compressed WebP
screens with keyboard-accessible navigation hotspots. Editor fields accept
temporary browser input and explicitly state that text is not saved. Rewind's
play/pause controls navigate between actual rendered player states. These are
tap-through native-screen walkthroughs, not Flutter emulators or native runtimes.

`aura/` contains eight static DOM/CSS captures from the actual React frontend,
including its studio, example conversation, dashboard, schedule, news, tools,
memory, and settings views. AURA's Windows, voice and AI actions remain local
demo controls; its React/Python runtime and services are not shipped.

Refresh native captures on a development machine with Flutter installed:

```powershell
python scripts/capture-flutter-previews.py SOURCE_ROOT
# Run in each portfolio-native-{rewind,chronicle-journal,dayform} checkout:
flutter test --no-pub test/portfolio_capture_test.dart
python scripts/export-native-previews.py SOURCE_ROOT
```

The helper resolves fonts locally and disables native services during rendering.
Chronicle's editor toolbar width constraint and duplicate Hero transitions are
adjusted only in the disposable capture checkout. Each export records the source
commit and capture adaptations in `source.json`.

For AURA, start its original Vite frontend on port 3013, then use
`scripts/capture-aura-preview.cjs` with the Playwright module and source-root
arguments. It captures with a demo desktop bridge. The checked-in asset copies
and `responsive.css` supply local, compressed artwork and narrow-screen layout.
