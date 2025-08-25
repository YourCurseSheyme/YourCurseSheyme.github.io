document.addEventListener('DOMContentLoaded', () => {
  // --- Код для обновленных часов в футере ---
  const timeElement = document.getElementById('local-time');

  if (timeElement) {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Europe/Moscow',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const timeParts = new Intl.DateTimeFormat('en-US', options).formatToParts(
        now
      );

      const timeValues = {};
      timeParts.forEach(({ type, value }) => {
        timeValues[type] = value;
      });

      timeElement.innerHTML = `
                <span>${timeValues.hour}</span>:<span>${timeValues.minute}</span>:<span>${timeValues.second}</span>
            `;
    };

    setInterval(updateTime, 1000);
    updateTime();
  }
});
