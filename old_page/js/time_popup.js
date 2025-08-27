document.addEventListener('DOMContentLoaded', function() {
    const popup = document.querySelector('.popup_overlay');
    const close = document.querySelector('.popup_close');
    const key = 'popupClosed';

    function Display() {
        if (!localStorage.getItem(key)) {
            setTimeout(() => {
                popup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 4000);
        }
    }

    function Close() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
        localStorage.setItem(key, 'true');
    }

    close.addEventListener('click', Close);
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            Close();
        }
    });
    Display();
});