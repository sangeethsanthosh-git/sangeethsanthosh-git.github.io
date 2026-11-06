/* Capture the original Next.js frontends as framework-free HTML/CSS snapshots.
 * Usage: node scripts/capture-next-previews.cjs PLAYWRIGHT_MODULE SOURCE_ROOT
 * Start Gistify on 3011  before capture.
 */
const { chromium } = require(process.argv[2]);
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');
const root = path.resolve(__dirname, '..', 'public', 'demos');
const sources = process.argv[3];
const projects = [
  { id: 'gistify', port: 3011, repo: 'Gistify', source: 'portfolio-source-Gistify', pages: ['', 'result'] },
];

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  for (const project of projects) {
    const dir = path.join(root, project.id);
    fs.mkdirSync(dir, { recursive: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    await page.addInitScript(() => {
      localStorage.setItem('token', 'portfolio-demo');
      localStorage.setItem('userId', '1');
      localStorage.setItem('user', JSON.stringify({ id: 1, email: 'demo@example.com' }));
      sessionStorage.setItem('analysis_result', JSON.stringify({
        type: 'Sample document', summary: 'This is a sample output showing the original Gistify interface. The full app analyses uploaded PDFs and text on its server.',
        entities: { people: [], organizations: ['Demo project'], locations: [], misc: ['Sample content'] },
        action_plan: { priority: 'Sample', recommended_action: 'Review the summary and explore the original project.', suggested_owner: 'Demo visitor' },
      }));
    });
    await page.route('http://127.0.0.1:8000/**', route => route.fulfill({
      status: 200, contentType: 'application/json', body: JSON.stringify(route.request().url().includes('splitters') ? [] : { id: 1, email: 'demo@example.com', phone: 'Demo' }),
    }));
    const styles = new Map();
    for (const slug of project.pages) {
      await page.goto(`http://localhost:${project.port}/${slug}`, { waitUntil: 'networkidle', timeout: 90000 });
      await page.waitForTimeout(1000);
      const links = await page.locator('link[rel="stylesheet"]').evaluateAll(es => es.map(e => e.href));
      for (const href of links) {
        if (styles.has(href)) continue;
        const response = await page.request.get(href);
        const css = await response.text();
        const name = `original-${crypto.createHash('sha256').update(css).digest('hex').slice(0, 10)}.css`;
        fs.writeFileSync(path.join(dir, name), css);
        styles.set(href, name);
      }
      let html = await page.evaluate(({ projectId, slug, cssNames }) => {
        const doc = document.documentElement.cloneNode(true);
        doc.querySelectorAll('script, nextjs-portal, next-route-announcer, link[rel="stylesheet"], link[rel="preload"], link[rel="modulepreload"], link[rel="icon"]').forEach(e => e.remove());
        doc.querySelectorAll('style').forEach(e => { if (e.textContent.includes('__nextjs_font')) e.remove(); });
        doc.querySelectorAll('[data-nextjs-scroll-focus-boundary]').forEach(e => e.removeAttribute('data-nextjs-scroll-focus-boundary'));
        const head = doc.querySelector('head');
        for (const name of cssNames) { const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = './' + name; head.append(link); }
        const responsive = document.createElement('link'); responsive.rel = 'stylesheet'; responsive.href = '../preview-common.css'; head.append(responsive);
        doc.querySelector('body').dataset.demoProject = projectId;
        doc.querySelector('body').dataset.demoPage = (slug || 'index') + '.html';
        doc.querySelectorAll('a[href^="/"]').forEach(a => {
          const route = a.getAttribute('href').split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
          a.setAttribute('href', './' + (route || 'index') + '.html');
        });
        // Static chart SVGs retain their original geometry and scale with the phone.
        doc.querySelectorAll('svg.recharts-surface').forEach(svg => {
          if (!svg.getAttribute('viewBox')) svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
          svg.style.maxWidth = '100%';
        });
        const script = document.createElement('script'); script.src = '../preview-common.js'; script.defer = true; doc.querySelector('body').append(script);
        return '<!DOCTYPE html>\n' + doc.outerHTML;
      }, { projectId: project.id, slug, cssNames: [...new Set(links.map(href => styles.get(href)))] });
      html = html.replaceAll('/hero.gif', './hero.webp');
      fs.writeFileSync(path.join(dir, (slug || 'index') + '.html'), html);
      console.log(`${project.id}/${slug || 'index'}: original DOM and CSS captured`);
    }
    const source = path.join(sources, project.source);
    const sha = cp.execFileSync('git', ['-C', source, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    fs.writeFileSync(path.join(dir, 'source.json'), JSON.stringify({
      repository: `https://github.com/sangeethsanthosh-git/${project.repo}`, commit: sha,
      pages: project.pages.map(p => (p || 'index') + '.html'),
      adaptations: ['Original rendered frontend captured as static DOM and CSS', 'Public demo fixtures', 'No React, Next.js or backend runtime in the preview', 'Still background in place of GIF'],
    }, null, 2) + '\n');
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
