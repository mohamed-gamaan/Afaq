/**
 * Afaq Law Firm Landing Page
 * JavaScript for Language Toggle and Navigation
 */

document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const langToggle = document.getElementById('langToggle');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const html = document.documentElement;

    // Initialize language from localStorage or default to Arabic
    const savedLang = localStorage.getItem('afaq-lang') || 'ar';
    setLanguage(savedLang);

    /**
     * Set the language and update DOM
     * @param {string} lang - 'ar' or 'en'
     */
    function setLanguage(lang) {
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        localStorage.setItem('afaq-lang', lang);
    }

    /**
     * Toggle between Arabic and English
     */
    function toggleLanguage() {
        const currentLang = html.getAttribute('lang');
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
    }

    // Language toggle click handler
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    // Navigation toggle for mobile
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a nav link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', updateHeader, { passive: true });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with .animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(function (el) {
        observer.observe(el);
    });

    // Fallback: If elements are manually selected (backward compatibility or specific targeting)
    const legacyElements = document.querySelectorAll('.about-card:not(.animate-on-scroll), .service-card:not(.animate-on-scroll), .contact-item:not(.animate-on-scroll)');
    legacyElements.forEach(function (el) {
        el.classList.add('animate-on-scroll', 'fade-up'); // Default animation
        observer.observe(el);
    });

    // Dynamic style injection is no longer needed as we use CSS classes now, 
    // but we can keep a cleanup or leave it if it was useful. 
    // Removing the dynamic style block as it conflicts with new CSS classes.

    // Hero Animation on Load
    function animateHero() {
        const heroElements = document.querySelectorAll('.hero-animate');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, 300 + (index * 200));
        });
    }

    animateHero();

    // Hero scroll indicator click
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function () {
            const nextSection = document.getElementById('services');
            if (nextSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = nextSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
        heroScroll.style.cursor = 'pointer';
    }
});
