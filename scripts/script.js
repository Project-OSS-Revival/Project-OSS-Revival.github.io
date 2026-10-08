document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', event => {
        const parent = item.parentElement;
        const answer = parent.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-toggle-icon');
        const isActive = parent.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(child => {
            child.classList.remove('active');
            const childAnswer = child.querySelector('.faq-answer');
            const childIcon = child.querySelector('.faq-toggle-icon');
            childAnswer.style.display = 'none';
            childAnswer.style.animation = 'slideUp 0.3s ease-in-out';
            childIcon.classList.remove('fa-chevron-down');
            childIcon.classList.add('fa-chevron-right');
        });

        if (!isActive) {
            answer.style.display = 'block';
            answer.style.animation = 'slideDown 0.3s ease-in-out';
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-down');
            parent.classList.add('active');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id], .footer[id]");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    const navbar = document.querySelector(".navbar");
    const darkSections = document.querySelectorAll(".hero-section, .cta-section, .footer");

    function setNavHeight() {
        document.documentElement.style.setProperty("--nav-height", navbar.offsetHeight + "px");
    }

    function updateNavTheme() {
        const line = navbar.getBoundingClientRect().bottom / 2;
        const onDark = [...darkSections].some((el) => {
            const r = el.getBoundingClientRect();
            return r.top <= line && r.bottom > line;
        });
        navbar.classList.toggle("on-dark", onDark);
    }

    function activateNav() {
        let currentSection = "";
        const offset = navbar.offsetHeight + 20;

        sections.forEach((section) => {
            if (window.scrollY + offset >= section.offsetTop) {
                currentSection = section.getAttribute("id");
            }
        });

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
            currentSection = "contact";
        }

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSection) {
                link.classList.add("active");
            }
        });
    }

    function onScroll() {
        activateNav();
        updateNavTheme();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { setNavHeight(); onScroll(); });
    setNavHeight();
    onScroll();
});
