/**
 * TAMAN BACA ANJELAS - CUSTOM JAVASCRIPT
 * Versi 2.0 - Agustus 2023
 * Dikembangkan khusus untuk Taman Baca Anjelas
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // INISIALISASI VARIABEL
    // ======================
    const body = document.body;
    const header = document.querySelector('header');
    const mainContent = document.querySelector('main');
    
    // ======================
    // LOADER HALAMAN
    // ======================
    function initPageLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-logo">
                <span>TBA</span>
            </div>
            <div class="loader-spinner"></div>
        `;
        body.appendChild(loader);
        
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('loaded');
                setTimeout(() => {
                    body.removeChild(loader);
                }, 500);
            }, 1000);
        });
    }

    // ======================
    // NAVIGASI UTAMA
    // ======================
    function initNavigation() {
        // Smooth scrolling
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav
                    updateActiveNav(this);
                    
                    // Tutup mobile menu jika terbuka
                    if (window.innerWidth <= 768) {
                        document.querySelector('nav ul').classList.remove('active');
                        document.querySelector('.mobile-menu-toggle').classList.remove('active');
                    }
                }
            });
        });
        
        // Highlight section aktif
        window.addEventListener('scroll', throttle(function() {
            const scrollPosition = window.scrollY;
            
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop - 100;
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
        
        function updateActiveNav(activeElement) {
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            activeElement.classList.add('active');
        }
    }

    // ======================
    // MOBILE MENU
    // ======================
    function initMobileMenu() {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('nav ul');
            const menuToggle = document.createElement('div');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            header.insertBefore(menuToggle, document.querySelector('.language-search'));
            
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                nav.classList.toggle('active');
                body.classList.toggle('menu-open');
            });
            
            // Tutup menu saat klik di luar
            document.addEventListener('click', function(e) {
                if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-toggle')) {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            });
        }
    }

    // ======================
    // ANIMASI SCROLL
    // ======================
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ======================
    // GALERI INTERAKTIF
    // ======================
    function initGallery() {
        const galleryItems = document.querySelectorAll('.work-item');
        
        galleryItems.forEach(item => {
            // Efek hover
            item.addEventListener('mouseenter', function() {
                this.querySelector('img').style.transform = 'scale(1.05)';
                this.querySelector('.work-caption').style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', function() {
                this.querySelector('img').style.transform = 'scale(1)';
                this.querySelector('.work-caption').style.opacity = '0.9';
            });
            
            // Lightbox
            item.querySelector('img').addEventListener('click', function() {
                createLightbox(this);
            });
        });
        
        function createLightbox(image) {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            
            const caption = document.createElement('p');
            caption.textContent = image.parentElement.querySelector('.work-caption').textContent;
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-btn';
            closeBtn.innerHTML = '&times;';
            
            lightboxContent.appendChild(closeBtn);
            lightboxContent.appendChild(img);
            lightboxContent.appendChild(caption);
            lightbox.appendChild(lightboxContent);
            body.appendChild(lightbox);
            
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            
            function closeLightbox() {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    body.removeChild(lightbox);
                }, 300);
            }
            
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            document.addEventListener('keydown', function escClose(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escClose);
                }
            });
        }
    }

    // ======================
    // FORM KONTAK
    // ======================
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form form');
        if (!contactForm) return;
        
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            // Efek focus
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            // Efek blur
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Cek isi input saat load
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });
        
        // Submit handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('#name').value.trim(),
                email: this.querySelector('#email').value.trim(),
                message: this.querySelector('#message').value.trim()
            };
            
            // Validasi
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Harap isi semua kolom', 'error');
                return;
            }
            
            if (!validateEmail(formData.email)) {
                showNotification('Email tidak valid', 'error');
                return;
            }
            
            // Simpan ke localStorage (simulasi)
            saveContactMessage(formData);
            
            // Tampilkan notifikasi
            showNotification('Pesan berhasil dikirim!', 'success');
            
            // Reset form
            this.reset();
            formInputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
        });
        
        function saveContactMessage(data) {
            let messages = JSON.parse(localStorage.getItem('tba_contact_messages') || '[]');
            messages.push({
                ...data,
                date: new Date().toISOString()
            });
            localStorage.setItem('tba_contact_messages', JSON.stringify(messages));
        }
    }

    // ======================
    // NOTIFIKASI
    // ======================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // ======================
    // UTILITY FUNCTIONS
    // ======================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
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

    // ======================
    // INISIALISASI SEMUA FITUR
    // ======================
    initPageLoader();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initGallery();
    initContactForm();

    // ======================
    // STYLE DINAMIS
    // ======================
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        /* Loader */
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--white);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader-logo {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 2rem;
            color: var(--primary);
        }
        
        .loader-logo span {
            color: var(--dark);
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid var(--light);
            border-top-color: var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        .page-loader.loaded {
            opacity: 0;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Lightbox */
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox.active {
            opacity: 1;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            display: block;
            border-radius: 5px;
        }
        
        .lightbox-content p {
            color: white;
            text-align: center;
            margin-top: 15px;
            font-size: 1.2rem;
        }
        
        .close-btn {
            position: absolute;
            top: -50px;
            right: 0;
            color: white;
            font-size: 2.5rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .close-btn:hover {
            color: var(--secondary);
        }
        
        /* Notification */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background-color: var(--dark);
            color: white;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            transform: translateX(200%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            background-color: var(--primary);
        }
        
        .notification.error {
            background-color: #e74c3c;
        }
        
        /* Mobile Menu */
        .mobile-menu-toggle {
            display: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--primary);
            padding: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block;
            }
            
            nav ul {
                position: fixed;
                top: 80px;
                left: 0;
                width: 100%;
                background-color: var(--white);
                flex-direction: column;
                align-items: center;
                padding: 1rem 0;
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                transform: translateY(-150%);
                transition: transform 0.3s ease;
                z-index: 999;
            }
            
            nav ul.active {
                transform: translateY(0);
            }
            
            nav ul li {
                margin: 0.5rem 0;
                width: 100%;
                text-align: center;
            }
            
            nav ul li a {
                display: block;
                padding: 0.5rem 1rem;
            }
            
            body.menu-open {
                overflow: hidden;
            }
        }
    `;
    document.head.appendChild(dynamicStyles);
});
