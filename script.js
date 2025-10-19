document.addEventListener("DOMContentLoaded", () => {
  const burgerToggle = document.getElementById("burger-toggle");
  const bandeau = document.getElementById("bandeau");
  const toggleableMenus = document.querySelectorAll(".menu.toggleable");

  // Menu burger
  burgerToggle.addEventListener("click", () => {
    bandeau.classList.toggle("open");
  });

  // Sous-menus au clic
  toggleableMenus.forEach(menu => {
    const title = menu.querySelector(".titre");
    title.addEventListener("click", () => {
      menu.classList.toggle("active");
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