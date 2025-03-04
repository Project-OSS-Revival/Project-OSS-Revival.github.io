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

document.addEventListener('DOMContentLoaded', function () {
    const clients = document.querySelectorAll('.clients-logos span');
    let clientsPerPage = window.innerWidth < 768 ? 4 : 6;
    let currentPage = 0;

    function showPage(page) {
        clientsPerPage = window.innerWidth < 768 ? 4 : 6; 
        const start = page * clientsPerPage;
        const end = start + clientsPerPage;

        clients.forEach((client, index) => {
            client.style.display = (index >= start && index < end) ? 'inline-block' : 'none';
        });

        document.getElementById('prev-btn').disabled = page === 0;
        document.getElementById('next-btn').disabled = end >= clients.length;
    }

    function updatePagination() {
        clientsPerPage = window.innerWidth < 768 ? 4 : 6;
        currentPage = 0;
        showPage(currentPage);
    }

    document.getElementById('next-btn').addEventListener('click', function () {
        if ((currentPage + 1) * clientsPerPage < clients.length) {
            currentPage++;
            showPage(currentPage);
        }
    });

    document.getElementById('prev-btn').addEventListener('click', function () {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });

    window.addEventListener('resize', function () {
        let oldClientsPerPage = clientsPerPage;
        clientsPerPage = window.innerWidth < 768 ? 4 : 6;

        if (clientsPerPage !== oldClientsPerPage) {
            currentPage = 0;
        }

        showPage(currentPage);
    });

    updatePagination();
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    function activateNav() {
        let currentSection = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", activateNav);
});
