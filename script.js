const burger = document.getElementById('burger');
const bandeau = document.getElementById('bandeau');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  bandeau.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien (menu et sous-menu)
const menuLinks = bandeau.querySelectorAll('a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (bandeau.classList.contains('active')) {
      bandeau.classList.remove('active');
      burger.classList.remove('active');
    }
  });
});

// Fermer le menu quand clic en dehors
document.addEventListener('click', (event) => {
  const isClickInsideMenu = bandeau.contains(event.target);
  const isClickOnBurger = burger.contains(event.target);

  if (bandeau.classList.contains('active') && !isClickInsideMenu && !isClickOnBurger) {
    bandeau.classList.remove('active');
    burger.classList.remove('active');
  }
});

// Detect desktop (souris)
const isDesktop = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Fermer sous-menu quand on clique un lien (desktop)
const submenuLinks = document.querySelectorAll('.submenu a');
submenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (isDesktop()) {
      const parent = link.closest('.menu.toggleable');
      document.body.classList.add('force-hover-disable');
      parent.classList.add('force-close');

      setTimeout(() => {
        parent.classList.remove('force-close');
        document.body.classList.remove('force-hover-disable');
      }, 250);
    }
  });
});

// Fermer menu mobile quand clic lien
document.querySelectorAll('#bandeau a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.getComputedStyle(burger).display !== 'none') {
      bandeau.classList.remove('active');
      burger.classList.remove('active');
    }
  });
});
