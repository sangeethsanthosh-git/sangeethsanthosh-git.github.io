/* Capture AURA's actual React interface without shipping its runtime or desktop bridge. */
const { chromium } = require(process.argv[2]);
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const out = path.resolve('public/demos/aura');
const source = path.join(process.argv[3], 'portfolio-native-AURA');
fs.mkdirSync(out, { recursive: true });
let browser;
(async () => {
  browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    localStorage.setItem('aura:setup-complete', 'true');
    localStorage.setItem('aura:profile-name', 'Demo visitor');
    localStorage.setItem('aura:theme-mode', 'light');
    const empty = { ok: false, data: {}, message: 'Portfolio demo', profiles: [], results: [], items: [] };
    const service = new Proxy({}, { get: () => async () => empty });
    window.aura = {
      onBackendEvent: () => () => {},
      request: async ({ command }) => {
        if (['listMemories', 'activities', 'listReminders', 'listEvents', 'listModels'].includes(command)) return [];
        if (command === 'status') return { backend: 'READY' };
        if (command === 'providerStatus') return {};
        if (command === 'voiceState') return { state: 'IDLE' };
        if (command === 'voiceProfiles') return { profiles: [], active_style: 'Neutral' };
        if (command === 'sendMessage') return { text: 'This is a sample response in the original AURA interface. Local models, voice, and Windows actions run in the full desktop app.', success: true, intent: 'demo', execution_source: 'demo', llm_provider: 'demo', model: 'Sample preview', execution_time: 0, metadata: {} };
        return empty;
      },
      settings: { ...service, loadAppSettings: async () => ({ setupComplete: true, profileName: 'Demo visitor', themeMode: 'light' }), loadProviderKeys: async () => ({}), saveAppSettings: async () => ({ ok: true }) },
      systemInfo: async () => ({ platform: 'Portfolio preview', ram_gb: 8, cpu: 'Demo', available_models: [] }),
      media: service, spotify: service, youtube: service, companion: service, window: service,
    };
  });
  await page.route('**/*', route => {
    const url = route.request().url();
    return url.startsWith('http://127.0.0.1:3013') || url.startsWith('data:') ? route.continue() : route.abort();
  });
  await page.goto('http://127.0.0.1:3013/', { waitUntil: 'networkidle' });
  await page.getByRole('navigation', { name: 'Suite Modules' }).waitFor();
  const pages = [['index', 'Studio & AI'], ['conversation', 'Studio & AI'], ['dashboard', 'Dashboard'], ['schedule', 'Schedule'], ['news', 'News'], ['widgets', 'Media & Tools'], ['memory', 'Memory'], ['settings', 'Settings']];
  for (const [name, label] of pages) {
    await page.getByRole('navigation', { name: 'Suite Modules' }).getByRole('button', { name: label, exact: false }).click();
    await page.waitForTimeout(350);
    if (name === 'conversation') {
      await page.locator('.capsule-composer-input').fill('Show me how AURA works.');
      await page.locator('.capsule-composer-input').press('Enter');
      await page.getByText('This is a sample response in the original AURA interface.', { exact: false }).waitFor();
    }
    const result = await page.evaluate(({ name }) => {
      const doc = document.documentElement.cloneNode(true);
      const css = [...document.querySelectorAll('style')].map(e => e.textContent).join('\n');
      doc.querySelectorAll('script, style, link[rel="stylesheet"], link[rel="icon"]').forEach(e => e.remove());
      const head = doc.querySelector('head');
      for (const href of ['./original.css', '../preview-common.css', './responsive.css']) {
        const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href; head.append(link);
      }
      const body = doc.querySelector('body'); body.dataset.demoProject = 'aura'; body.dataset.demoPage = name + '.html';
      const script = document.createElement('script'); script.src = './demo.js'; script.defer = true; body.append(script);
      return { html: '<!DOCTYPE html>\n' + doc.outerHTML, css };
    }, { name });
    let html = result.html.replaceAll('src="/assets/', 'src="./assets/').replaceAll('url(/assets/', 'url(./assets/').replaceAll('url("/assets/', 'url("./assets/');
    fs.writeFileSync(path.join(out, name + '.html'), html);
    fs.writeFileSync(path.join(out, 'original.css'), result.css.replaceAll('url(/assets/', 'url(./assets/').replaceAll('url("/assets/', 'url("./assets/'));
    console.log('aura/' + name + ': original UI captured');
  }
  const sha = cp.execFileSync('git', ['-C', source, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  fs.writeFileSync(path.join(out, 'source.json'), JSON.stringify({ repository: 'https://github.com/sangeethsanthosh-git/AURA', commit: sha, adaptations: ['Original React DOM and CSS captured with demo bridge fixtures', 'Static navigation; no React or Python runtime', 'Responsive phone overrides'] }, null, 2) + '\n');
  await browser.close();
})().catch(async error => { console.error(error); await browser?.close(); process.exitCode = 1; });
