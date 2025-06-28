document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // INISIALISASI VARIABEL
    // ======================
    const body = document.body;
    const header = document.querySelector('header');
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    // ======================
    // FUNGSI NAVIGASI
    // ======================
    function initNavigation() {
        // Smooth scrolling untuk semua link navigasi
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
                    
                    // Update nav aktif
                    updateActiveNav(this);
                    
                    // Tutup mobile menu jika terbuka
                    if (window.innerWidth <= 768) {
                        document.querySelector('nav ul').classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                        body.classList.remove('menu-open');
                    }
                }
            });
        });
        
        // Auto-highlight section yang aktif
        window.addEventListener('scroll', throttle(function() {
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
            header.insertBefore(mobileMenuToggle, document.querySelector('.language-search'));
            
            mobileMenuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                nav.classList.toggle('active');
                body.classList.toggle('menu-open');
            });
            
            // Tutup menu saat klik di luar
            document.addEventListener('click', function(e) {
                if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-toggle')) {
                    mobileMenuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    body.classList.remove('menu-open');
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
        
        // Efek form field
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
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
            showNotification('Pesan berhasil dikirim! Terima kasih', 'success');
            
            // Reset form
            this.reset();
            formInputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
        });
    }

    // ======================
    // FUNGSI BANTU
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
    
    function saveContactMessage(data) {
        let messages = JSON.parse(localStorage.getItem('tba_contact_messages') || '[]');
        messages.push({
            ...data,
            date: new Date().toISOString()
        });
        localStorage.setItem('tba_contact_messages', JSON.stringify(messages));
    }
    
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
    initNavigation();
    initMobileMenu();
    initContactForm();
});
