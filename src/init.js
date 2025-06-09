AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-in-out',
});

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500); // Small delay to ensure animations are smooth
    }
});

document.addEventListener('DOMContentLoaded', () => {
  if (typeof initRadio === 'function') {
    initRadio();
  }
}); 