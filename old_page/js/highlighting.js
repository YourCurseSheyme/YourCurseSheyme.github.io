document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.nav_button');
  const original_color = 'rgb(204, 204, 204)';
  const original_border = 'rgb(38, 38, 38)';

  buttons.forEach(button => {
      const text = button.querySelector('.button_text');
      button.addEventListener('mouseenter', () => {
          text.style.color = '#fff';
          button.style.borderColor = 'rgba(255, 255, 255, 0.5)';
      });

      button.addEventListener('mouseleave', () => {
          text.style.color = original_color;
          button.style.borderColor = original_border;
      });
  });

  const submit = document.querySelector('.submit_button');

  submit.addEventListener('mouseenter', () => {
      submit.style.opacity = '.8';
  });

  submit.addEventListener('mouseleave', () => {
      submit.style.opacity = '1';
  });
})