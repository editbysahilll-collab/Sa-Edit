const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const navbar = document.querySelector('.navbar');
const offset = navbar ? navbar.offsetHeight + 20 : 80;

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });

    document.getElementById('main-nav')?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});
