// Mobile nav toggle
const toggle = document.querySelector('.header__toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', nav.classList.toggle('is-open'));
});

// Brand marquee: clone the logo group once so the loop is seamless
const track = document.querySelector('.brands__track');
const group = track?.firstElementChild;
if (group) {
  const copy = group.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  track.append(copy);
}

// Testimonials slider (Splide via CDN)
if (window.Splide) {
  new Splide('#reviews-slider', {
    type: 'loop',
    perPage: 3,
    gap: '1rem',
    autoplay: true,
    interval: 5000,
    pauseOnHover: true,
    arrows: false,
    breakpoints: { 960: { perPage: 2 }, 640: { perPage: 1 } },
  }).mount();
}
