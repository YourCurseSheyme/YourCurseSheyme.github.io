document.addEventListener("DOMContentLoaded", function() {
    const popup = document.querySelector('.epoch_popup_overlay');
    const close = document.querySelector('.epoch_popup_close');
    const days = document.querySelector('.epoch_days');
    const hours = document.querySelector('.epoch_hours');
    const minutes = document.querySelector('.epoch_minutes');
    const seconds = document.querySelector('.epoch_seconds');
    const button = document.querySelector('.feedback_button');
    const kEpochDate = new Date('2038-01-19T03:14:08Z');
    let timer = null;

    function Update() {
        const now = new Date();
        const diff = kEpochDate - now;
        if (diff <= 0) {
            days.textContent = '0';
            hours.textContent = '0';
            minutes.textContent = '0';
            seconds.textContent = '0';
            Clear();
            return;
        }
        days.textContent = (Math.floor(diff / (1000 * 60 * 60 * 24))).toString();
        hours.textContent =
            (Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toString().padStart(2, '0');
        minutes.textContent = (Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, '0');
        seconds.textContent = (Math.floor((diff % (1000 * 60)) / 1000)).toString().padStart(2, '0');
    }

    function Clear() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function Open() {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        Update();
        Clear();
        timer = setInterval(Update, 1000);
    }

    function Close() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
        Clear();
    }

    function HandleKeyDown(event) {
        if (event.key === 'Escape' && popup.classList.contains('active')) {
            Close();
        }
    }

    button.addEventListener('click', function(event) {
        event.preventDefault();
        Open();
    });
    close.addEventListener('click', Close);
    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            Close();
        }
    });
    document.addEventListener('keydown', HandleKeyDown);
});