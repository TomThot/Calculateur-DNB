// Sélection des éléments
const burger = document.getElementById('burger');
const bandeau = document.getElementById('bandeau');
const menuToggleable = document.querySelectorAll('.menu.toggleable');

// Fonction pour détecter desktop
const isDesktop = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ----------------------
// MENU BURGER (MOBILE)
// ----------------------
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  bandeau.classList.toggle('active');
});

// Fermer le menu mobile au clic sur un lien
bandeau.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (!isDesktop() && bandeau.classList.contains('active')) {
      bandeau.classList.remove('active');
      burger.classList.remove('active');
    }
  });
});

// Fermer le menu si clic en dehors (mobile uniquement)
document.addEventListener('click', event => {
  if (!isDesktop() && bandeau.classList.contains('active')) {
    if (!bandeau.contains(event.target) && !burger.contains(event.target)) {
      bandeau.classList.remove('active');
      burger.classList.remove('active');
    }
  }
});

// ----------------------
// SOUS-MENUS (DESKTOP)
// ----------------------
// Sur desktop, le hover gère l'ouverture. On ajoute juste rotation flèche si clic
menuToggleable.forEach(menu => {
  const arrow = menu.querySelector('.arrow');
  const titre = menu.querySelector('.titre');

  // Clic sur le titre pour activer la rotation flèche (optionnel)
  titre.addEventListener('click', () => {
    if (isDesktop()) {
      menu.classList.toggle('active'); // rotation de la flèche
      setTimeout(() => {
        menu.classList.remove('active'); // retourne à l'état normal
      }, 800); // durée avant reset
    }
  });
});
