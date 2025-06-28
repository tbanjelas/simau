document.addEventListener('DOMContentLoaded', function() {
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
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
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
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // ======================
    // LANGUAGE SWITCHER
    // ======================
    
    const languageSwitcher = document.querySelector('.language-switcher');
    languageSwitcher.addEventListener('click', function(e) {
        if (e.target.tagName === 'SPAN') {
            const language = e.target.textContent;
            const languageText = language === 'ID' ? 'Bahasa Indonesia' : 'English';
            
            // Show language change notification
            showNotification(`Language changed to ${languageText}`);
            
            // Here you would typically load language files or change content
            // For now we'll just toggle active class
            document.querySelectorAll('.language-switcher span').forEach(span => {
                span.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });
    
    // ======================
    // SEARCH FUNCTIONALITY
    // ======================
    
    const searchForm = document.querySelector('.search-bar');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = this.querySelector('input');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            // In a real implementation, this would search your content
            showNotification(`Searching for: ${searchTerm}`);
            searchInput.value = '';
        }
    });
    
    // ======================
    // CONTACT FORM HANDLING
    // ======================
    
    const contactForm = document.querySelector('.contact-form form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('#name').value,
            email: this.querySelector('#email').value,
            message: this.querySelector('#message').value
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!validateEmail(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Your message has been sent! We will contact you soon.', 'success');
        this.reset();
        
        // In a real implementation, you would send the data to a server here
        // Example with fetch API:
        /*
        fetch('your-server-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            showNotification('Message sent successfully!', 'success');
            this.reset();
        })
        .catch(error => {
            showNotification('Error sending message. Please try again.', 'error');
        });
        */
    });
    
    // ======================
    // GALLERY FUNCTIONALITY
    // ======================
    
    // Lightbox functionality for gallery images
    document.querySelectorAll('.work-item img').forEach(image => {
        image.addEventListener('click', function() {
            const lightbox = createLightbox(this);
            document.body.appendChild(lightbox);
        });
    });
    
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
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
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
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
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
        
        // Close lightbox when clicking outside image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target === closeBtn) {
                document.body.removeChild(lightbox);
            }
        });
        
        // Close with ESC key
        document.addEventListener('keydown', function escClose(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', escClose);
            }
        });
        
        return lightbox;
    }
    
    // ======================
    // ADDITIONAL STYLES FOR JS FUNCTIONALITY
    // ======================
    
    const style = document.createElement('style');
    style.textContent = `
        /* Notification styles */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background-color: #333;
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
            background-color: var(--primary-color);
        }
        
        .notification.error {
            background-color: #e74c3c;
        }
        
        /* Lightbox styles */
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
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
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
        
        /* Active nav item */
        nav a.active {
            color: var(--secondary-color) !important;
        }
        
        nav a.active::after {
            width: 100% !important;
        }
        
        /* Active language */
        .language-switcher span.active {
            color: var(--secondary-color);
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
});
