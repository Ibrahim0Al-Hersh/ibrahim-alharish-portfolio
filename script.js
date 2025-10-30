// Language Switching System
class LanguageManager {
    constructor() {
        this.currentLang = 'ar';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedLanguage();
    }

    setupEventListeners() {
        // Language toggle button
        document.getElementById('langToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Smooth scrolling
        this.setupSmoothScrolling();
        
        // Scroll effects
        this.setupScrollEffects();
        
        // Animations
        this.setupAnimations();
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
        this.applyLanguage();
        this.saveLanguage();
    }

    applyLanguage() {
        const dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        
        // Update HTML direction and language
        document.documentElement.dir = dir;
        document.documentElement.lang = this.currentLang;
        
        // Update all elements with data attributes
        this.updateAllTexts();
        
        // Update toggle button text
        const toggleBtn = document.getElementById('langToggle');
        toggleBtn.textContent = this.currentLang === 'ar' ? 'EN' : 'AR';
        toggleBtn.setAttribute('data-current', this.currentLang);
        
        // Trigger custom event for any additional updates
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLang }
        }));
    }

    updateAllTexts() {
        // Update all elements with data-ar and data-en attributes
        const elements = document.querySelectorAll('[data-ar][data-en]');
        
        elements.forEach(element => {
            const newText = this.currentLang === 'ar' 
                ? element.getAttribute('data-ar') 
                : element.getAttribute('data-en');
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = newText;
            } else if (element.hasAttribute('alt')) {
                element.setAttribute('alt', newText);
            } else if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', newText);
            } else {
                element.textContent = newText;
            }
        });
    }

    saveLanguage() {
        localStorage.setItem('preferred-language', this.currentLang);
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
            this.currentLang = savedLang;
            this.applyLanguage();
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'var(--white)';
                navbar.style.backdropFilter = 'none';
            }
        });
    }

    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.timeline-content, .cert-category, .skill-category, .contact-item, .education-item, .stat-card');
        
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Form submission handling (if you add a contact form later)
const handleFormSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    const currentLang = document.documentElement.lang;
    if (currentLang === 'ar') {
        alert('شكراً لتواصلك! سيتم الرد عليك قريباً.');
    } else {
        alert('Thank you for contacting us! We will respond to you soon.');
    }
};

// Initialize the language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
});
