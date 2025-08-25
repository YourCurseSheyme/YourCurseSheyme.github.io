document.addEventListener('DOMContentLoaded', () => {
  // --- Логика для Dropdown-меню ---
  const trigger = document.getElementById('index-trigger');
  const menu = document.getElementById('dropdown-menu');

  if (trigger && menu) {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      menu.classList.toggle('is-open');
    });

    document.addEventListener('click', (e) => {
      if (
        menu.classList.contains('is-open') &&
        !trigger.contains(e.target) &&
        !menu.contains(e.target)
      ) {
        menu.classList.remove('is-open');
      }
    });
  }

  // --- НОВЫЙ КОД: Плавная прокрутка ---

  // 1. Находим все ссылки, которые ведут к секциям на странице
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  for (const link of scrollLinks) {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Отменяем стандартный "прыжок"

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Если это ссылка из выпадающего меню, сначала закроем меню
        if (menu && menu.classList.contains('is-open')) {
          menu.classList.remove('is-open');
        }

        // Запускаем нашу функцию плавной прокрутки
        smoothScrollTo(targetElement);
      }
    });
  }

  // 2. Наша кастомная функция для анимации
  function smoothScrollTo(targetElement) {
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1200; // Длительность анимации в миллисекундах (1.2 секунды)
    let startTime = null;

    // Easing-функция для красивого замедления (ease-in-out)
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  }
});
