/* Static UI previews: no uploads, accounts, API requests, payment or model execution. */
(() => {
  window.addEventListener('message', (event) => {
    if (event.source === window.parent && event.data?.type === 'portfolio-preview-visibility') {
      document.documentElement.dataset.previewPaused = event.data.visible ? 'false' : 'true';
    }
  });
  const project = document.body.dataset.demoProject;
  const page = document.body.dataset.demoPage;
  const byId = (id) => document.getElementById(id);
  const show = (message, target = document.querySelector('main') || document.body) => {
    let box = target.querySelector('.preview-demo-message');
    if (!box) { box = document.createElement('p'); box.className = 'preview-demo-message'; box.setAttribute('role', 'status'); target.prepend(box); }
    box.textContent = message;
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  // All navigation remains inside this project's static snapshot.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (link && /^(https?:)?\/\//.test(link.getAttribute('href') || '')) {
      event.preventDefault(); show('External services are available in the full project. This portfolio preview stays local.');
    }
  });
  document.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    if (/login|register|signup/.test(page)) {
      location.href = './' + (project === 'traffic' ? 'index' : 'dashboard') + '.html';
    } else if (project === 'edusense') {
      location.href = './chat.html';
    } else if (project === 'cartoon') {
      location.href = './result.html';
    } else if (project === 'vault' && page === 'upload.html') {
      location.href = './verify.html';
    } else if (project === 'pcod') {
      show('Demo only. The trained clinical model is not running and no medical risk is calculated.', form);
    } else {
      show('Demo complete. The full application processes and stores this data on its backend. Nothing was sent or saved here.', form);
    }
  });
  const toggle = (id, fn) => byId(id)?.addEventListener('click', fn);
  toggle('sidebarToggleBtn', () => document.body.classList.toggle('sidebar-open'));
  toggle('sidebarBackdrop', () => document.body.classList.remove('sidebar-open'));
  for (const id of ['closeSettingsBtn', 'cancelSettingsBtn', 'settingsBackdrop']) toggle(id, () => document.body.classList.remove('settings-open'));
  document.querySelectorAll('[data-open-settings], #openSettingsBtn, #settingsBtn').forEach((button) => button.addEventListener('click', () => document.body.classList.add('settings-open')));
  toggle('saveSettingsBtn', () => { show('Settings controls are shown as a local demo.'); document.body.classList.remove('settings-open'); });
  toggle('createSessionBtn', () => { location.href = './chat.html'; });
  toggle('uploadfile', () => { location.href = './result.html'; });
  toggle('startBtn', () => show('The full EduSense application records and transcribes lectures. Recording is disabled in this demo.'));
  document.querySelectorAll('[data-bs-toggle]').forEach((button) => button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.bsTarget);
    target?.classList.toggle('show');
    button.setAttribute('aria-expanded', target?.classList.contains('show') ? 'true' : 'false');
  }));
  document.querySelectorAll('[data-bs-dismiss="offcanvas"]').forEach((button) => button.addEventListener('click', () => button.closest('.offcanvas')?.classList.remove('show')));
  if (project === 'pcod') {
    let index = 0;
    const update = () => {
      const clinical = document.querySelector('.mode-radio:checked')?.value === 'clinical';
      const steps = [...document.querySelectorAll('.form-step')].filter((e) => !e.dataset.clinicalStep || clinical);
      index = Math.min(index, steps.length - 1);
      document.querySelectorAll('.form-step').forEach((e) => e.classList.toggle('d-none', e !== steps[index]));
      document.querySelectorAll('[data-clinical-field]').forEach((e) => { e.disabled = !clinical; });
      const percent = Math.round((index + 1) / steps.length * 100);
      if (byId('stepProgressLabel')) byId('stepProgressLabel').textContent = `Step ${index + 1} of ${steps.length}`;
      if (byId('stepProgressPercent')) byId('stepProgressPercent').textContent = `${percent}%`;
      if (byId('stepProgressBar')) byId('stepProgressBar').style.width = `${percent}%`;
      byId('nextStepBtn')?.classList.toggle('d-none', index === steps.length - 1);
      byId('submitPredictionBtn')?.classList.toggle('d-none', index !== steps.length - 1);
      if (byId('prevStepBtn')) byId('prevStepBtn').disabled = index === 0;
    };
    if (byId('predictionForm')) {
      toggle('nextStepBtn', () => { index++; update(); });
      toggle('prevStepBtn', () => { index = Math.max(0, index - 1); update(); });
      document.querySelectorAll('.mode-radio').forEach((e) => e.addEventListener('change', update));
      update();
    }
  }
  if (project === 'gistify') {
    document.querySelectorAll('button').forEach((button) => {
      if (/analy[sz]e|^\s*run\s*$/i.test(button.textContent)) button.addEventListener('click', () => { location.href = './result.html'; });
      if (/download/i.test(button.textContent)) button.addEventListener('click', () => show('This is the original export control. Download generation is available in the full app.'));
    });
  }
  if (project === 'finley') {
    const routes = { 'Go to Dashboard': 'dashboard', Login: 'login', Register: 'register', Logout: 'login' };
    document.querySelectorAll('button, span').forEach((button) => {
      const route = routes[button.textContent.trim()];
      if (route) button.addEventListener('click', () => { location.href = './' + route + '.html'; });
    });
    document.querySelectorAll('button').forEach((button) => {
      if (/send|pay|add splitter|AI assistant|connect/i.test(button.textContent)) button.addEventListener('click', () => show('This control uses the full app backend. No payment, account change or AI request occurs in this demo.'));
    });
  }
})();
