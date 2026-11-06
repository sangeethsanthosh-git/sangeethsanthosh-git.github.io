document.querySelector('form').addEventListener('submit', (event) => {
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
