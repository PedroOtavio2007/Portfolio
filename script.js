const currentYear = document.querySelector('#current-year');
const navigationLinks = [...document.querySelectorAll('.main-nav a')];
const navigableSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

currentYear.textContent = new Date().getFullYear();

const setActiveLink = (id) => {
  navigationLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries.find((entry) => entry.isIntersecting);
    if (visibleSection) setActiveLink(visibleSection.target.id);
  },
  { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
);

navigableSections.forEach((section) => sectionObserver.observe(section));

const revealElements = [...document.querySelectorAll('[data-reveal]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.documentElement.classList.add('js');

document.querySelectorAll('[data-reveal-group]').forEach((group) => {
  [...group.querySelectorAll(':scope > [data-reveal]')].forEach((item, index) => {
    item.style.transitionDelay = `${index * 120}ms`;
  });
});

const revealElement = (element) => {
  element.classList.add('is-revealed');
};

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach(revealElement);
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
        } else {
          entry.target.classList.remove('is-revealed');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -48px' }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}
