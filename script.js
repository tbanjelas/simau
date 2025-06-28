document.addEventListener('DOMContentLoaded', () => {
    // ======================
    // ELEMEN UTAMA
    // ======================
    const body = document.body;
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav a');
    const contactForm = document.getElementById('contact-form');
    
    // ======================
    // INISIALISASI COMPONENTS
    // ======================
    initMobileMenu();
    initSmoothScroll();
    initScrollEffects();
    initFormValidation();
    initInteractiveElements();
    initAnimations();

    // ======================
    // FUNGSI UTAMA
    // ======================
    function initMobileMenu() {
        if (window.innerWidth > 768) return;
        
        const nav = document.querySelector('nav ul');
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Toggle menu');
        
        header.appendChild(menuToggle);
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Tutup menu saat klik di luar
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && !e.target.matches('.mobile-menu-toggle')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }

    function initSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (!link.getAttribute('href').startsWith('#')) return;
                
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav
                    updateActiveNav(link);
                }
            });
        });
    }

    function initScrollEffects() {
        // Header effect on scroll
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Active section detection
            const scrollPosition = window.scrollY + 100;
            
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    const correspondingNav = document.querySelector(`nav a[href="#${sectionId}"]`);
                    if (correspondingNav) {
                        updateActiveNav(correspondingNav);
                    }
                }
            });
        }, 100));
    }

    function initFormValidation() {
        if (!contactForm) return;
        
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            // Add focus/blur effects
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Initialize filled state
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: contactForm.querySelector('#name').value.trim(),
                email: contactForm.querySelector('#email').value.trim(),
                message: contactForm.querySelector('#message').value.trim()
            };
            
            // Validation
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Harap isi semua kolom', 'error');
                return;
            }
            
            if (!validateEmail(formData.email)) {
                showNotification('Email tidak valid', 'error');
                return;
            }
            
            // Simulate form submission
            try {
                // In a real app, you would use fetch() to send data to server
                await simulateSubmit(formData);
                showNotification('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
                contactForm.reset();
                formInputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
            } catch (error) {
                showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
            }
        });
    }

    function initInteractiveElements() {
        // Activity card hover effects
        const activities = document.querySelectorAll('.activity');
        activities.forEach(activity => {
            activity.addEventListener('mouseenter', () => {
                activity.style.transform = 'translateY(-10px)';
            });
            
            activity.addEventListener('mouseleave', () => {
                activity.style.transform = '';
            });
        });
        
        // Floating animation for important elements
        const floatingElements = document.querySelectorAll('.floating');
        floatingElements.forEach(el => {
            el.style.animationDelay = `${Math.random() * 0.5}s`;
        });
    }

    function initAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // ======================
    // HELPER FUNCTIONS
    // ======================
    function updateActiveNav(activeElement) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeElement.classList.add('active');
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function simulateSubmit(data) {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve();
            }, 1000);
        });
    }

    function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        }
    }
});
