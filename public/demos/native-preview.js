// The visible controls link original, locally rendered Flutter screens.
// No model, native plugin, scanner, database or Flutter engine is loaded here.
document.querySelectorAll('.native-hotspot').forEach((link) => {
  link.addEventListener('click', (event) => {
    link.style.backgroundColor = '#c5a05933';
    if (link.title === 'Save' && [...document.querySelectorAll('.native-field')].some(field => field.value.trim())) {
      event.preventDefault();
      const message = document.createElement('p'); message.className = 'native-demo-status'; message.setAttribute('role', 'status');
      message.textContent = "Preview only. Your text isn't saved in this demo."; document.body.append(message);
    }
  });
});
document.querySelectorAll('.native-field').forEach(field => field.addEventListener('input', () => field.classList.toggle('has-value', !!field.value)));
