/* -----------------------------------------------------------



----------------------------------------------------------- */

(function () {
    'use strict';

    var navbar = document.getElementById('nbNavbar');
    var banner = document.getElementById('nbBanner');
    var hamburger = document.getElementById('nbHamburger');
    var sidebar = document.getElementById('nbSidebar');
    var backdrop = document.getElementById('nbBackdrop');
    var closeBtn = document.getElementById('nbClose');
    var sToggle = document.getElementById('nbServicesToggle');
    var sMenu = document.getElementById('nbServicesMenu');

    /* ── Scroll: shrink navbar + hide banner ── */
    window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
            navbar && navbar.classList.add('nb-scrolled');
            banner && banner.classList.add('nb-hidden');
        } else {
            navbar && navbar.classList.remove('nb-scrolled');
            banner && banner.classList.remove('nb-hidden');
        }
    }, { passive: true });

    /* ── Open sidebar ── */
    function openSidebar() {
        sidebar.classList.add('nb-open');
        sidebar.setAttribute('aria-hidden', 'false');
        hamburger.classList.add('nb-open');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    /* ── Close sidebar ── */
    function closeSidebar() {
        sidebar.classList.remove('nb-open');
        sidebar.setAttribute('aria-hidden', 'true');
        hamburger.classList.remove('nb-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburger && hamburger.addEventListener('click', openSidebar);
    closeBtn && closeBtn.addEventListener('click', closeSidebar);
    backdrop && backdrop.addEventListener('click', closeSidebar);

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeSidebar();
    });

    /* Close when a nav link is tapped */
    sidebar && sidebar.querySelectorAll('.nb-snav a').forEach(function (a) {
        a.addEventListener('click', closeSidebar);
    });

    /* Close when resizing back to desktop */
    window.addEventListener('resize', function () {
        if (window.innerWidth > 991) closeSidebar();
    });

    /* ── Services accordion (sidebar) ── */
    sToggle && sToggle.addEventListener('click', function () {
        var isOpen = sMenu.classList.toggle('nb-open');
        sToggle.classList.toggle('nb-open', isOpen);
        sToggle.setAttribute('aria-expanded', String(isOpen));
    });

    /* ── Mark active link by current page ── */
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nb-links a, .nb-snav a').forEach(function (a) {
        if (a.getAttribute('href') === page) {
            a.classList.add('nb-active');
        } else {
            a.classList.remove('nb-active');
        }
    });


})();















































// Accordion SECTION

const faqs = document.querySelectorAll(".faq-item");

faqs.forEach((faq) => {
    faq.querySelector(".faq-question").addEventListener("click", () => {
        faqs.forEach((item) => {
            if (item !== faq) item.classList.remove("active");
        });
        faq.classList.toggle("active");
    });
});
// Accordion SECTION






















// HOME PAGE HERO SECTION JS

class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.content = document.querySelector('.content-wrapper');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.isTransitioning = false;

        this.init();
    }

    init() {
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto play
        this.startAutoPlay();

    }



    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;

        this.isTransitioning = true;

        const currentSlide = this.slides[this.currentIndex];
        const nextSlide = this.slides[index];

        // Prepare next slide
        nextSlide.classList.add("zoom-out");
        nextSlide.style.opacity = "1";

        // Animate current slide out
        currentSlide.classList.remove("active");
        currentSlide.classList.add("zoom-in");

        this.indicators[this.currentIndex].classList.remove("active");
        this.indicators[index].classList.add("active");

        setTimeout(() => {
            // Cleanup classes
            currentSlide.classList.remove("zoom-in");
            nextSlide.classList.remove("zoom-out");

            nextSlide.classList.add("active");

            this.currentIndex = index;
            this.isTransitioning = false;

        }, 1800); // match CSS transition
    }



    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 6000); // Change slide every 6 seconds
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}


// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
});































// Scroll Animation Script

(function () {
    const observer = new IntersectionObserver(
        (entries) => {
            const groups = {}; // Group by animation type

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animationType = Array.from(el.classList).find((cls) =>
                        cls.startsWith("animate-")   // updated prefix
                    );

                    if (!groups[animationType]) groups[animationType] = [];
                    groups[animationType].push(el);

                    observer.unobserve(el); // Animate only once
                }
            });

            // Apply stagger per animation group
            Object.values(groups).forEach((group) => {
                group.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add("animate-visible"); // updated suffix
                    }, index * 300); // Delay between elements
                });
            });
        },
        { threshold: 0.2 }
    );

    // Observe all animate elements
    document.querySelectorAll('[class*="animate-"]').forEach((el) => {
        observer.observe(el);
    });
})();



