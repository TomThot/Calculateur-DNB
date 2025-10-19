document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger-toggle');
  const bandeau = document.getElementById('bandeau');

  burger.addEventListener('click', () => {
    bandeau.classList.toggle('open');
    burger.textContent = bandeau.classList.contains('open') ? '✖ Menu' : '☰ Menu';
  });

  // Clic sur les titres en responsive
  if (window.innerWidth <= 768) {
    const toggleMenus = document.querySelectorAll('.menu.toggleable .titre');
    toggleMenus.forEach(titre => {
      titre.addEventListener('click', (e) => {
        e.preventDefault(); // évite les comportements inattendus
        const menu = titre.closest('.menu');
        menu.classList.toggle('active');
      });
    });
  }
});
