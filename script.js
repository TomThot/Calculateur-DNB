const burger = document.getElementById('burger');         // On récupère le bouton burger 
const bandeau = document.getElementById('bandeau');       // On récupère le menu

burger.addEventListener('click', () => {                  // Quand on clique sur le burger
  burger.classList.toggle('active');                      // On ajoute/enlève .active sur le burger → animation icône
  bandeau.classList.toggle('active');                     // On ajoute/enlève .active sur le menu → ouverture/fermeture via CSS
});

// Fermer le menu quand on clique sur un lien (menu et sous-menu)
const menuLinks = bandeau.querySelectorAll('a');          // On sélectionne tous les liens <a> qui se trouvent à l’intérieur du bandeau
menuLinks.forEach(link => {                               // On parcourt chaque lien
  link.addEventListener('click', () => {                  // Pour chaque lien, on ajoute un écouteur
    if (bandeau.classList.contains('active')) {           // Si le menu est ouvert
      bandeau.classList.remove('active');                 // On ferme le menu
      burger.classList.remove('active');                  // On remet le burger normal
    }
  });
});

// Fermer le menu principal quand l’utilisateur clique en dehors du menu ou du bouton burger
document.addEventListener('click', (event) => {           // On écoute tout clic dans la page
  const isClickInsideMenu = bandeau.contains(event.target); // Vérifie si on clique dans le menu
  const isClickOnBurger = burger.contains(event.target);    // ou sur le burger

  if (bandeau.classList.contains('active') && !isClickInsideMenu && !isClickOnBurger) {
    bandeau.classList.remove('active');
    burger.classList.remove('active');
  }
});

// Détecter desktop (souris)
const isDesktop = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Fermer sous-menu quand on clique un lien
const submenuLinks = document.querySelectorAll('.submenu a');     // Sélection des liens des sous-menus
submenuLinks.forEach(link => {
  link.addEventListener('click', () => {                          // Pour chaque lien → ajoute un click
      const parent = link.closest('.menu.toggleable');            // Trouve le bloc parent du sous-menu
      document.body.classList.add('force-hover-disable');         // Désactive le hover
      parent.classList.add('force-close');                        // Force la fermeture du sous-menu

      setTimeout(() => {                                          // Après 250ms (le temps de l'animation)
        parent.classList.remove('force-close');                  // On enlève ces classes
        document.body.classList.remove('force-hover-disable');
      }, 250);
  });
});
