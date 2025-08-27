document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('coinflip-trigger');
  const windowEl = document.getElementById('coinflip-window');
  const closeBtn = document.getElementById('coinflip-close-btn');
  const titleBar = document.getElementById('coinflip-title-bar');

  if (!trigger || !windowEl || !closeBtn || !titleBar) {
    console.error('Coinflip feature elements not found!');
    return;
  }

  // Сохраняем смещение (относительно центра)
  let offsetX = 0;
  let offsetY = 0;

  // Устанавливаем базовую позицию окна — фиксированная позиция
  windowEl.style.position = 'fixed';
  windowEl.style.left = '50%';
  windowEl.style.top = '50%';
  windowEl.style.transform = 'translate(-50%, -50%)'; // Только центрирование
  windowEl.style.willChange = 'transform'; // Оптимизация рендеринга

  trigger.addEventListener('click', () => {
    // Возвращаем в центр + применяем смещение
    windowEl.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    windowEl.classList.remove('is-hidden');
  });

  closeBtn.addEventListener('click', () => {
    windowEl.classList.add('is-hidden');
  });

  // --- Логика перетаскивания с целочисленным смещением ---
  let isDragging = false;
  let initialX, initialY;

  titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    initialX = e.clientX - offsetX;
    initialY = e.clientY - offsetY;
    titleBar.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    // Округляем до целого пикселя
    offsetX = Math.round(e.clientX - initialX);
    offsetY = Math.round(e.clientY - initialY);

    // Используем calc() для комбинирования центрирования и смещения
    windowEl.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    titleBar.style.cursor = 'move';
  });

  // --- Логика монетки ---
  const coin = document.getElementById('coin');
  const resultText = document.getElementById('coinflip-result');

  if (coin && resultText) {
    let finalRotationY = 0;

    coin.addEventListener('click', () => {
      if (coin.classList.contains('is-flipping')) return;
      resultText.classList.remove('is-visible');
      coin.classList.remove('result-heads', 'result-tails');
      const isTails = Math.random() < 0.5;
      finalRotationY = isTails ? 180 : 0;
      setTimeout(() => {
        coin.classList.add(
          'is-flipping',
          isTails ? 'result-tails' : 'result-heads'
        );
      }, 10);
      setTimeout(() => {
        coin.classList.remove('is-flipping');
        coin.style.transform = `rotateY(${finalRotationY}deg)`;
        resultText.textContent = isTails ? 'TAILS' : 'HEADS';
        resultText.classList.add('is-visible');
      }, 2000);
    });
  }
});
