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
