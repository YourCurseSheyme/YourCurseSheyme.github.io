document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.gallery_overlay');
    const pic = document.querySelector('.gallery_image');
    const close = document.querySelector('.gallery_close');
    const prev = document.querySelector('.gallery_prev');
    const next = document.querySelector('.gallery_next');
    const cards = document.querySelectorAll('.card');
    const images = Array.from(cards).map(card => {
        const img = card.querySelector('.card_image');
        return {
            preview: img.src,
            original: img.src.replace('/thumbs/', '/img/')
        };
    });
    let idx = 0;
    let touch_start = 0;

    function Open(jdx) {
        idx = jdx;
        Update();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function Update() {
        pic.src = images[idx].original;
        pic.alt = cards[idx].querySelector('.card_name').textContent;
    }

    function Close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function Prev() {
        idx = (idx - 1 + images.length) % images.length;
        Update();
    }

    function Next() {
        idx = (idx + 1) % images.length;
        Update();
    }

    function HandleSwipe(touch_end) {
        const threshold = 50;
        if (touch_end < touch_start - threshold) {
            Next();
        }
        else if (touch_end > touch_start + threshold) {
            Prev();
        }
    }

    cards.forEach((card, index) => {
        const img = card.querySelector('.card_image');
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => Open(index));
    });

    close.addEventListener('click', Close);
    prev.addEventListener('click', Prev);
    next.addEventListener('click', Next);

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            Close();
        }
    });
    overlay.addEventListener('touchstart', (event) => {
        touch_start = event.touches[0].clientX;
    }, { passive: true });
    overlay.addEventListener('touchend', (event) => {
        HandleSwipe(event.changedTouches[0].clientX);
    }, { passive: true });

    document.addEventListener('keydown', (event) => {
        if (!overlay.classList.contains('active')) {
            return;
        }
        switch (event.key) {
            case 'Escape':{
                Close();
                break;
            }
            case 'ArrowLeft':{
                Prev();
                break;
            }
            case 'ArrowRight':{
                Next();
                break;
            }
        }
    });
});