const burger = document.getElementById('burger');
const bandeau = document.getElementById('bandeau');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
  bandeau.classList.toggle('active');
});
