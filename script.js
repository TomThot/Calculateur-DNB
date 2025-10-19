document.addEventListener("DOMContentLoaded", () => {
  const burgerToggle = document.getElementById("burger-toggle");
  const bandeau = document.getElementById("bandeau");

  burgerToggle.addEventListener("click", () => {
    bandeau.classList.toggle("open");
  });

  // Optionnel : refermer le menu si on clique en dehors
  document.addEventListener("click", (e) => {
    const isClickInside = bandeau.contains(e.target) || burgerToggle.contains(e.target);
    if (!isClickInside && bandeau.classList.contains("open")) {
      bandeau.classList.remove("open");
    }
  });
});
