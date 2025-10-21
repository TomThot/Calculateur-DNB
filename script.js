document.addEventListener("DOMContentLoaded", () => {
  const burgerToggle = document.getElementById("burger-toggle");
  const bandeau = document.getElementById("bandeau");
  const toggleableMenus = document.querySelectorAll(".menu.toggleable");

  // Menu burger
  burgerToggle.addEventListener("click", () => {
    bandeau.classList.toggle("open");
    burgerToggle.classList.toggle("rotate-90");
  });


  // Sous-menus au clic avec toggle propre
  toggleableMenus.forEach(menu => {
    const title = menu.querySelector(".titre");
    title.addEventListener("click", (e) => {
      e.stopPropagation(); // ← empêche le clic de se propager au document

      const isActive = menu.classList.contains("active");

      // Ferme tous les autres menus
      toggleableMenus.forEach(m => m.classList.remove("active"));

      // Si ce menu n'était pas déjà ouvert, on l'ouvre
      if (!isActive) {
        menu.classList.add("active");
      }
    });
  });


  // Ferme le sous-menu quand on clique sur un lien <a>
  toggleableMenus.forEach(menu => {
    const links = menu.querySelectorAll(".submenu a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
        // Optionnel : aussi fermer le bandeau en mobile
        if (window.innerWidth <= 480) {
          bandeau.classList.remove("open");
          burgerToggle.classList.remove("rotate-90");
        }
      });
    });
  });

  // Optionnel : refermer les sous-menus si on clique ailleurs
  document.addEventListener("click", (e) => {
    const isInsideMenu = e.target.closest(".menu.toggleable");
    const isBurger = e.target.closest("#burger-toggle");

    if (!isInsideMenu && !isBurger) {
      toggleableMenus.forEach(menu => menu.classList.remove("active"));
      bandeau.classList.remove("open");
    }
  });
});

// permet de rduire le header quand on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("reduit");
  } else {
    header.classList.remove("reduit");
  }
});
////////////////////////////////////////////////////////
