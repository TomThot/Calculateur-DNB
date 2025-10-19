document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger-toggle');
  const bandeau = document.getElementById('bandeau');
  const test=0;
  burger.addEventListener('click', () => {
    bandeau.classList.toggle('open');
    burger.textContent = bandeau.classList.contains('open') ? '✖' : '☰';
  });
});
