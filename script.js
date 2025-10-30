const burger = document.getElementById('burger');         //On récupère le bouton burger 
const bandeau = document.getElementById('bandeau');       // on récupère le menu

burger.addEventListener('click', () => {                  //quand on clique sur le burger
  burger.classList.toggle('active');                      //On ajoute/enlève .active sur le burger → animation icône
  bandeau.classList.toggle('active');                     //On ajoute/enlève .active sur le menu → ouverture/fermeture via CSS
});


// Fermer le menu quand on clique sur un lien (menu et sous-menu)
const menuLinks = bandeau.querySelectorAll('a');          //On sélectionne tous les liens <a> qui se trouvent à l’intérieur du bandeau (le menu). querySelectorAll('a') retourne une liste de tous les liens du menu et des sous-menus.
menuLinks.forEach(link => {                               //On parcourt chaque lien avec une boucle forEach.link représente un lien individuel dans cette liste.
  link.addEventListener('click', () => {                  //Pour chaque lien, on ajoute un écouteur d’événement.Quand l’utilisateur clique sur ce lien, la fonction suivante est exécutée.
    if (bandeau.classList.contains('active')) {           //On vérifie si le menu (#bandeau) est actuellement ouvert (c’est-à-dire qu’il a la classe active).Cela évite de tenter de le fermer s’il est déjà fermé.
      bandeau.classList.remove('active');                 //Si le menu est ouvert, on retire la classe active pour le fermer (grâce au CSS qui gère max-height et opacity).
      burger.classList.remove('active');                  //On retire aussi la classe active du bouton burger, ce qui change l’icône de ✖ vers ☰.
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

// Fermer menu mobile quand clic lien (double sécurité)
document.querySelectorAll('#bandeau a').forEach(link => {         //Pour chaque lien du menu
  link.addEventListener('click', () => {
       //si le burger est visible → donc on est sur mobile
      bandeau.classList.remove('active');                         ///On ferme le menu
      burger.classList.remove('active');
    
  });
});