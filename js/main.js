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

// Shop: category filter + sort (progressive enhancement, no framework)
const grid = document.querySelector('[data-products]');
if (grid) {
  const items = [...grid.children];
  const chips = document.querySelectorAll('.chip');
  const sort = document.querySelector('[data-sort]');
  const count = document.querySelector('[data-count]');
  const empty = document.querySelector('[data-empty]');
  let category = 'all';

  const render = () => {
    const shown = items.filter((el) => category === 'all' || el.dataset.category === category);
    const dir = { 'price-asc': 1, 'price-desc': -1 }[sort.value];
    if (dir) shown.sort((a, b) => (a.dataset.price - b.dataset.price) * dir);
    else shown.sort((a, b) => items.indexOf(a) - items.indexOf(b));
    items.forEach((el) => (el.hidden = !shown.includes(el)));
    shown.forEach((el) => grid.append(el));
    count.textContent = `${shown.length} product${shown.length === 1 ? '' : 's'}`;
    empty.hidden = shown.length > 0;
  };

  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      category = chip.dataset.filter;
      chips.forEach((c) => c.classList.toggle('is-active', c === chip));
      render();
    })
  );
  sort.addEventListener('change', render);
}
