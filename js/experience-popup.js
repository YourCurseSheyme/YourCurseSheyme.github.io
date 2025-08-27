document.addEventListener('DOMContentLoaded', () => {
  const experienceItems = document.querySelectorAll('.experience__item');
  const popup = document.getElementById('experience-popup');
  const popupText = popup.querySelector('.experience-popup__text');

  if (!experienceItems.length || !popup || !popupText) return;

  // --- Функция для обновления позиции окна ---
  const movePopup = (e) => {
    let newX = e.clientX - popup.offsetWidth / 2;
    let newY = e.clientY - popup.offsetHeight - 15;
    popup.style.left = `${newX}px`;
    popup.style.top = `${newY}px`;
  };

  // --- ИСПРАВЛЕННАЯ ЛОГИКА ---
  experienceItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const newDescription = item.getAttribute('data-description');

      // Сначала показываем само окно, если оно было скрыто
      popup.classList.add('is-visible');

      // Прячем текст, чтобы его обновить
      popupText.classList.remove('is-visible');

      // Ждем, пока анимация скрытия (250ms) завершится
      setTimeout(() => {
        // Меняем текст, пока он невидим
        popupText.textContent = newDescription;

        // Показываем текст с новым содержимым
        popupText.classList.add('is-visible');
      }, 250); // Это время должно совпадать с transition в CSS

      document.addEventListener('mousemove', movePopup);
    });

    item.addEventListener('mouseleave', () => {
      popup.classList.remove('is-visible');
      document.removeEventListener('mousemove', movePopup);
    });
  });
});
