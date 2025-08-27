document.addEventListener('DOMContentLoaded', function () {
    const nav_bar = document.querySelector('.nav_container');
    const resume_button = document.querySelector('.title_container');
    const about_me_section = document.querySelector('.about_me_screen');
    const sections = document.querySelectorAll('section');
    let current_section = '';

    nav_bar.style.position = 'static';
    nav_bar.style.opacity = '0';
    nav_bar.style.transition = 'opacity 0.5s ease, background-color 0.3s ease';
    nav_bar.style.pointerEvents = 'none';

    setTimeout(() => {
        nav_bar.style.opacity = '1';
        nav_bar.style.pointerEvents = 'auto';
    }, 800);

    function UpdateButton(section_id) {
        if (!resume_button) return;
        const text_map = {
            'open_screen': 'Resume',
            'about_me_screen': "About Me",
            'information_screen': 'My Goal',
            'skill_screen': 'My Stack',
            'feedback_screen': 'Contact'
        };
        if (text_map[section_id]) {
            resume_button.querySelector('.button_text').textContent = text_map[section_id];
            resume_button.setAttribute('data-target', `#${section_id}`);
        }
    }

    function HandleScroll() {
        const scroll_pos = window.scrollY;
        const offset = about_me_section.offsetTop;
        if (scroll_pos >= offset + 100) {
            requestAnimationFrame(() => {
                nav_bar.style.position = 'sticky';
                nav_bar.style.top = '0';
                nav_bar.style.zIndex = '1000';
                nav_bar.classList.add('scrolled');
            });
        } else {
            requestAnimationFrame(() => {
                nav_bar.style.position = 'static';
                nav_bar.classList.remove('scrolled');
            });
        }
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.id;
            if (scroll_pos >= top && scroll_pos <= top + height) {
                if (current_section !== id) {
                    current_section = id;
                    UpdateButton(current_section);
                }
            }
        });
    }

    if (resume_button) {
        resume_button.addEventListener('click', function(event) {
            event.preventDefault();
            const target_id = this.getAttribute('data-target');
            if (target_id) {
                const target_section = document.querySelector(target_id);
                if (target_section) {
                    window.scrollTo({
                        top: target_section.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    window.addEventListener('scroll', HandleScroll);
    HandleScroll();
})