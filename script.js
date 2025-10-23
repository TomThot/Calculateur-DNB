const burger = document.getElementById('burger');
const bandeau = document.getElementById('bandeau');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
  bandeau.classList.toggle('active');
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




document.addEventListener('click', (event) => {
  const isClickInsideMenu = bandeau.contains(event.target);
  const isClickOnBurger = burger.contains(event.target);

  // Si le menu est ouvert et que le clic est en dehors du menu ET du bouton burger
  if (bandeau.classList.contains('active') && !isClickInsideMenu && !isClickOnBurger) {
    bandeau.classList.remove('active');
    burger.classList.remove('active');
  }
});