const burger = document.getElementById('burger');         //On récupère le bouton burger 
const bandeau = document.getElementById('bandeau');       // on récupère le menu

burger.addEventListener('click', () => {                  //quand on clique sur le burger
  burger.classList.toggle('active');                      //On ajoute/enlève .active sur le burger → animation icône
  bandeau.classList.toggle('active');                     //On ajoute/enlève .active sur le menu → ouverture/fermeture via CSS
});






bandeau.addEventListener('click', (event) => {
  event.stopPropagation();                 // <--- AJOUTÉ
});























// Fermer le menu quand on clique sur un lien (menu et sous-menu)
const menuLinks = bandeau.querySelectorAll('a');          //On sélectionne tous les liens <a> qui se trouvent à l’intérieur du bandeau (le menu). querySelectorAll('a') retourne une liste de tous les liens du menu et des sous-menus.
menuLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.stopPropagation();               // <--- AJOUTÉ

    bandeau.classList.remove('active');
    burger.classList.remove('active');

    // Gestion sous-menu
    const parent = link.closest('.menu.toggleable');
    if (parent) {
      document.body.classList.add('force-hover-disable');
      parent.classList.add('force-close');

      setTimeout(() => {
        parent.classList.remove('force-close');
        document.body.classList.remove('force-hover-disable');
      }, 250);
    }
  });
});



//sert à fermer le menu principal (le #bandeau) quand l’utilisateur clique en dehors du menu ou du bouton burger.//

document.addEventListener('click', (event) => {//On écoute tout clic dans la page
  const isClickInsideMenu = bandeau.contains(event.target);//Vérifie si on clique dans le menu
  const isClickOnBurger = burger.contains(event.target);//ou sur le burger

  // Si le menu est ouvert et que le clic est en dehors du menu ET du bouton burger
  if (bandeau.classList.contains('active') && !isClickInsideMenu && !isClickOnBurger) {
     // Ferme le menu principal
    bandeau.classList.remove('active');
    burger.classList.remove('active');
  }
});


// Detect desktop (souris)
const isDesktop = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches; //vérifie si l'appareil à un pointeur (souris) et permet de survoler (hover) donc PC

// Fermer sous-menu quand on clique un lien
const submenuLinks = document.querySelectorAll('.submenu a');     //Sélectionne les liens des sous-menus

submenuLinks.forEach(link => {
  link.addEventListener('click', () => {                          //Pour chaque lien → ajoute un click
                                                                   //Seulement sur ordinateur (pas mobile)
      const parent = link.closest('.menu.toggleable');            //Trouve le bloc parent du sous-menu
      document.body.classList.add('force-hover-disable');         //Désactive le hover
      parent.classList.add('force-close');                        //Force la fermeture du sous-menu

      setTimeout(() => {                                          //Après 250ms (le temps de l'animation)
        parent.classList.remove('force-close');                   //On enlève ces classes
        document.body.classList.remove('force-hover-disable');
      }, 250);
    
  });
});

