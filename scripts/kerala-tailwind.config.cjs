// Matches the original repository's templates/base.html configuration.
module.exports = {
  content: ['./public/demos/kerala/*.html'],
  theme: { extend: {
    colors: { forest: '#173A2E', spice: '#B88949', sand: '#F6F0E4', clay: '#9D5E3E', ink: '#1C2421', mist: '#EEF2ED' },
    boxShadow: { heritage: '0 24px 70px rgba(23, 58, 46, 0.14)', glow: '0 18px 50px rgba(184, 137, 73, 0.22)' },
    fontFamily: { sans: ['Manrope', 'sans-serif'], serif: ['Cormorant Garamond', 'serif'] }
  } }
};
