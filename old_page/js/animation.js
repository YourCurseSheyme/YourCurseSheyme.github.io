document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-in');
    let lastScrollPos = 0;
    let animationLock = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationLock) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    animationLock = true;
                    setTimeout(() => {
                        animationLock = false;
                    }, 100);
                }, delay);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    elements.forEach(element => {
        element.style.transitionDelay = (element.dataset.delay || 0) + 'ms';
        observer.observe(element);
    });

    window.addEventListener('scroll', () => {
        lastScrollPos = window.pageYOffset;
    });
});