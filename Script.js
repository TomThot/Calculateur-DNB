const burger = document.getElementById('burger-toggle');
      const bandeau = document.getElementById('bandeau');

      burger.addEventListener('click', () => {
        bandeau.classList.toggle('open');
      });
