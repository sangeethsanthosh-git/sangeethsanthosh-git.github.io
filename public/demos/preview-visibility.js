window.addEventListener('message', (event) => {
  if (event.source === window.parent && event.data?.type === 'portfolio-preview-visibility') {
    document.documentElement.dataset.previewPaused = event.data.visible ? 'false' : 'true';
  }
});
