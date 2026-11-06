(() => {
  const routes = { 'Studio & AI': 'index', Dashboard: 'dashboard', Schedule: 'schedule', News: 'news', 'Media & Tools': 'widgets', Memory: 'memory', Settings: 'settings' };
  const status = (text) => {
    let message = document.querySelector('.aura-demo-status');
    if (!message) { message = document.createElement('p'); message.className = 'aura-demo-status'; message.setAttribute('role', 'status'); (document.querySelector('main') || document.body).prepend(message); }
    message.textContent = text; message.scrollIntoView({ block: 'nearest' });
  };
  document.querySelectorAll('.suite-tab-btn').forEach(button => {
    const match = Object.keys(routes).find(label => button.textContent.includes(label));
    if (match) button.addEventListener('click', () => { location.href = './' + routes[match] + '.html'; });
  });
  document.querySelector('.brand-identity-box')?.addEventListener('click', () => { location.href = './index.html'; });
  document.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    if (document.querySelector('.capsule-composer-input')) location.href = './conversation.html';
    else status('Preview only. Changes are not saved; local models and Windows services run in the full AURA app.');
  }));
  const input = document.querySelector('.capsule-composer-input');
  input?.addEventListener('input', () => { const button = document.querySelector('.capsule-send-btn'); if (button) button.disabled = !input.value.trim(); });
  document.querySelectorAll('.welcome-suggestion-pill').forEach(button => button.addEventListener('click', () => { location.href = './conversation.html'; }));
  document.querySelectorAll('button').forEach(button => {
    if (!button.closest('nav') && !button.classList.contains('welcome-suggestion-pill') && button.type !== 'submit') {
      button.addEventListener('click', () => status('This is the original control. The desktop app handles this action; this preview makes no system or AI requests.'));
    }
  });
})();
