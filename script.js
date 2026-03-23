document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // NAVBAR SCROLL
    // ================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ================================
    // BURGER MENU
    // ================================
    const burger = document.getElementById('burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            burger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links > li > a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                burger.classList.remove('active');
            });
        });
    }

    // ================================
    // BURGER ANIMATION
    // ================================
    const style = document.createElement('style');
    style.textContent = `
        .burger.active span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }
        .burger.active span:nth-child(2) {
            opacity: 0;
        }
        .burger.active span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);

    // ================================
    // MOBILE DROPDOWN TOGGLE
    // ================================
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();

                const parent = toggle.closest('.dropdown');
                const isOpen = parent.classList.contains('open');

                // Close all other dropdowns first
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== parent) d.classList.remove('open');
                });

                // Toggle current
                if (isOpen) {
                    parent.classList.remove('open');
                } else {
                    parent.classList.add('open');
                }
            }
        });
    });

    // Close dropdown when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(d => {
                    d.classList.remove('open');
                });
            }
        }
    });

    // Close mobile menu when a dropdown item is clicked
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('open');
                burger.classList.remove('active');
                document.querySelectorAll('.dropdown').forEach(d => {
                    d.classList.remove('open');
                });
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
        }
    });

    // ================================
    // SCROLL REVEAL
    // ================================
    const revealElements = document.querySelectorAll(
        '.card, .why-item, .service-row, .stat-box, .contact-item'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ================================
    // CHECKBOX INTERACTION
    // ================================
    document.querySelectorAll('.check-item').forEach(item => {
        item.addEventListener('click', () => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;

            if (checkbox.checked) {
                item.style.borderColor = '#16a34a';
                item.style.background = '#f0fdf4';
            } else {
                item.style.borderColor = '';
                item.style.background = '';
            }
        });
    });

    // ================================
    // FORM SUBMIT
    // ================================
    const form = document.getElementById('inquiryForm');
    if (form) {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('.submit-btn');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            btn.style.opacity = '0.8';
        });
    }

    // ================================
    // STATS COUNTER ANIMATION
    // ================================
    const statBoxes = document.querySelectorAll('.stat-box h3');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const hasSlash = text.includes('/');

                if (!hasSlash) {
                    const num = parseInt(text.replace(/[^0-9]/g, ''));
                    if (!isNaN(num)) {
                        let current = 0;
                        const duration = 1500;
                        const step = num / (duration / 16);

                        const counter = setInterval(() => {
                            current += step;
                            if (current >= num) {
                                current = num;
                                clearInterval(counter);
                            }
                            el.textContent =
                                Math.floor(current).toLocaleString() +
                                (hasPlus ? '+' : '') +
                                (hasPercent ? '%' : '');
                        }, 16);
                    }
                }
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statBoxes.forEach(el => countObserver.observe(el));

    // ================================
    // SMOOTH HOVER ON SERVICE ROWS
    // ================================
    document.querySelectorAll('.service-row').forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.borderLeftWidth = '4px';
            row.style.borderLeftColor = '#16a34a';
        });
        row.addEventListener('mouseleave', () => {
            row.style.borderLeftWidth = '';
            row.style.borderLeftColor = '';
        });
    });

});
