// GSAP Registration
gsap.registerPlugin();

class EliteFBO {
    constructor() {
        this.init();
    }

    init() {
        this.cursorEffect();
        this.navbarScroll();
        this.heroAnimations();
        this.serviceHover();
        this.scrollAnimations();
        this.servicesDropdown();
        this.formHandler();
        this.statsCounter();
    }

    cursorEffect() {
        const cursor = document.querySelector('.cursor');
        const cursor2 = document.querySelector('.cursor2');
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        gsap.ticker.add(() => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            
            gsap.set(cursor, { left: cursorX, top: cursorY });
            gsap.set(cursor2, { left: cursorX, top: cursorY });
        });

        // Hover effects
        document.querySelectorAll('a, button, .service-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor2.style.transform = 'translate(-50%, -50%) scale(0)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor2.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    navbarScroll() {
        gsap.to('.navbar', {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
        });
    }

    heroAnimations() {
        // Title stagger
        gsap.from('.title-line', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Stats counter
        gsap.from('.hero-stats .stat', {
            scale: 0,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        });

        // Buttons
        gsap.from('.hero-buttons', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.8,
            ease: 'power3.out'
        });

        // Floating hero content
        gsap.to('.hero-content', {
            y: -20,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }

    serviceHover() {
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card.querySelector('.service-icon'), {
                    rotation: 360,
                    scale: 1.2,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card.querySelector('.service-icon'), {
                    rotation: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });
        });
    }

    scrollAnimations() {
        gsap.utils.toArray('.service-card, .feature-item').forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 80,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: i * 0.1
            });
        });
    }

    servicesDropdown() {
        document.querySelectorAll('.service-category').forEach(category => {
            category.addEventListener('click', () => {
                const details = category.querySelector('.service-details');
                const isOpen = details.classList.contains('show');
                
                // Close others
                document.querySelectorAll('.service-details.show').forEach(d => {
                    if (d !== details) {
                        d.classList.remove('show');
                        gsap.to(d, { height: 0, duration: 0.5 });
                    }
                });
                
                if (isOpen) {
                    details.classList.remove('show');
                    gsap.to(details, { height: 0, duration: 0.5 });
                } else {
                    details.classList.add('show');
                    gsap.to(details, { height: 'auto', duration: 0.6, ease: 'power2.out' });
                }
            });
        });
    }

    formHandler() {
        const form = document.getElementById('inquiryForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = form.querySelector('.submit-btn');
                const original = btn.textContent;
                
                gsap.to(btn, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
                
                btn.textContent = 'Sending...';
                btn.disabled = true;
                
                setTimeout(() => {
                    document.getElementById('successMessage').style.display = 'block';
                    gsap.from('#successMessage', {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'back.out(1.7)'
                    });
                    form.reset();
                    btn.textContent = original;
                    btn.disabled = false;
                }, 2000);
            });
        }
    }

    statsCounter() {
        const stats = document.querySelectorAll('.stat span');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            
            gsap.to(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    onEnter: () => {
                        const tl = gsap.timeline();
                        tl.to(stat, {
                                                        textContent: target,
                            duration: 2,
                            snap: { textContent: 1 },
                            ease: 'power2.out',
                            onUpdate: function() {
                                stat.textContent = Math.ceil(this.targets()[0].textContent);
                            }
                        });
                    }
                }
            });
        });
    }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    new EliteFBO();
});

// Preloader
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    gsap.from('body', {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// Intersection Observer for performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe elements for scroll reveal
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});
