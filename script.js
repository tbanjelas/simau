document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // GLOBAL VARIABLES
    // ======================
    const body = document.body;
    const header = document.querySelector('header');
    const scrollUp = document.createElement('div');
    scrollUp.className = 'scroll-up';
    scrollUp.innerHTML = '<i class="fas fa-arrow-up"></i>';
    body.appendChild(scrollUp);

    // ======================
    // NAVIGATION FUNCTIONALITY
    // ======================
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav item
            updateActiveNav(this);
        });
    });
    
    // Highlight current section in navigation
    window.addEventListener('scroll', function() {
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

        // Show/hide scroll up button
        if (window.scrollY > 300) {
            scrollUp.classList.add('show');
        } else {
            scrollUp.classList.remove('show');
        }

        // Header shadow on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    function updateActiveNav(activeElement) {
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        activeElement.classList.add('active');
    }

    // Scroll to top functionality
    scrollUp.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ======================
    // LANGUAGE SWITCHER
    // ======================
    const languageSwitcher = document.querySelector('.language-switcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', function(e) {
            if (e.target.tagName === 'SPAN') {
                const language = e.target.textContent;
                const languageText = language === 'ID' ? 'Bahasa Indonesia' : 'English';
                
                showNotification(`Bahasa diubah ke ${languageText}`);
                
                document.querySelectorAll('.language-switcher span').forEach(span => {
                    span.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });
    }

    // ======================
    // SEARCH FUNCTIONALITY
    // ======================
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                showNotification(`Mencari: "${searchTerm}"`);
                searchInput.value = '';
            }
        });
    }

    // ======================
    // CONTACT FORM HANDLING
    // ======================
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                message: this.querySelector('#message').value
            };
            
            // Basic validation
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Harap isi semua kolom', 'error');
                return;
            }
            
            if (!validateEmail(formData.email)) {
                showNotification('Harap masukkan alamat email yang valid', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.', 'success');
            this.reset();
            
            // In a real implementation, you would send the data to a server here
            // sendFormData(formData);
        });
    }

    // ======================
    // GALLERY FUNCTIONALITY
    // ======================
    // Lightbox functionality for gallery images
    document.querySelectorAll('.work-item img').forEach(image => {
        image.addEventListener('click', function() {
            createLightbox(this);
        });
    });

    function createLightbox(image) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';
        
        const lightboxImage = document.createElement('img');
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        
        const caption = document.createElement('p');
        caption.textContent = image.parentElement.querySelector('.work-caption').textContent;
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        
        lightboxContent.appendChild(closeBtn);
        lightboxContent.appendChild(lightboxImage);
        lightboxContent.appendChild(caption);
        lightbox.appendChild(lightboxContent);
        body.appendChild(lightbox);
        
        // Add active class after a short delay
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        // Close lightbox
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
        
        // Close with ESC key
        document.addEventListener('keydown', function escClose(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escClose);
            }
        });
    }

    // ======================
    // ANIMATIONS
    // ======================
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.pillar, .activity, .founder, .work-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.pillar, .activity, .founder, .work-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load and then on scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // ======================
    // HELPER FUNCTIONS
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
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ======================
    // ADDITIONAL STYLES FOR JS ELEMENTS
    // ======================
    const style = document.createElement('style');
    style.textContent = `
        /* Scroll Up Button */
        .scroll-up {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--primary);
            color: white;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-up.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-up:hover {
            background-color: #e05d00;
            transform: translateY(-5px);
        }
        
        /* Scrolled Header */
        header.scrolled {
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        }
        
        /* Animated Elements */
        .pillar.animated,
        .activity.animated,
        .founder.animated,
        .work-item.animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
