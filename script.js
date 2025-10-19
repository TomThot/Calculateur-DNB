document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger-toggle');
  const bandeau = document.getElementById('bandeau');

  burger.addEventListener('click', () => {
    bandeau.classList.toggle('open');
    burger.textContent = bandeau.classList.contains('open') ? '✖ Menu' : '☰ Menu';
  });

  // Toggle des sous-menus uniquement en responsive
  if (window.innerWidth <= 768) {
    const toggleMenus = document.querySelectorAll('.menu.toggleable .titre');
    toggleMenus.forEach(titre => {
      titre.addEventListener('click', () => {
        const parentMenu = titre.closest('.menu');
        parentMenu.classList.toggle('active');
      });
    });
  }
});
