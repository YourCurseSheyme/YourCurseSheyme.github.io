document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.gallery_overlay');
    const pic = document.querySelector('.gallery_image');
    const close = document.querySelector('.gallery_close');
    const prev = document.querySelector('.gallery_prev');
    const next = document.querySelector('.gallery_next');
    const images = document.querySelectorAll('.card_image');
    let idx = 0;
    let touch_start = 0;
    let touch_end = 0;

    function Open(jdx) {
        idx = jdx;
        Update();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function Update() {
        pic.src = images[idx].src;
        pic.alt = images[idx].alt;
        prev.style.display = idx === 0 ? 'none' : 'block';
        next.style.display = idx === images.length - 1 ? 'none' : 'block';
    }

    function Close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function Prev() {
        if (idx > 0) {
            --idx;
            Update();
        }
    }

    function Next() {
        if (idx < images.length - 1) {
            ++idx;
            Update();
        }
    }

    function HandleSwipe() {
        const threshold = 50;
        if (touch_end < touch_start - threshold) {
            Next();
        } else if (touch_end > touch_start + threshold) {
            Prev();
        }
    }

    images.forEach((image, index) => {
        image.style.cursor = 'pointer';
        image.addEventListener('click', () => Open(index));
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
        touch_start = event.changedTouches[0].screenX;
    }, {passive: true});
    overlay.addEventListener('touchend', (event) => {
        touch_end = event.changedTouches[0].screenX;
        HandleSwipe();
    }, {passive: true});

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'Escape':
                Close();
                break;
            case 'ArrowLeft':
                Prev();
                break;
            case 'ArrowRight':
                Next();
                break;
        }
    });
});