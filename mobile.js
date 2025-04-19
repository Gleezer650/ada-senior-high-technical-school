document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.setAttribute('aria-hidden', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Slideshow functionality with performance optimizations
    const slideshows = document.querySelectorAll('.slideshow');
    
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        if (!slides.length) return;

        let currentSlide = 0;
        let slideInterval;
        let isAnimating = false;
        
        function showNextSlide() {
            if (isAnimating) return;
            isAnimating = true;

            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');

            // Update ARIA attributes
            slides.forEach((slide, index) => {
                slide.setAttribute('aria-hidden', index !== currentSlide);
                if (index === currentSlide) {
                    slide.setAttribute('aria-current', 'true');
                } else {
                    slide.removeAttribute('aria-current');
                }
            });

            setTimeout(() => {
                isAnimating = false;
            }, 300); // Match transition duration
        }

        function showPreviousSlide() {
            if (isAnimating) return;
            isAnimating = true;

            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');

            // Update ARIA attributes
            slides.forEach((slide, index) => {
                slide.setAttribute('aria-hidden', index !== currentSlide);
                if (index === currentSlide) {
                    slide.setAttribute('aria-current', 'true');
                } else {
                    slide.removeAttribute('aria-current');
                }
            });

            setTimeout(() => {
                isAnimating = false;
            }, 300);
        }
        
        // Initialize slideshow
        function startSlideshow() {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(showNextSlide, 5000);
        }

        // Pause on hover/touch
        slideshow.addEventListener('mouseenter', () => {
            if (slideInterval) clearInterval(slideInterval);
        });

        slideshow.addEventListener('mouseleave', startSlideshow);
        
        // Touch swipe functionality with debouncing
        let touchStartX = 0;
        let touchEndX = 0;
        let lastSwipeTime = 0;
        
        slideshow.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slideshow.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            const currentTime = new Date().getTime();
            
            // Debounce swipes (minimum 300ms between swipes)
            if (currentTime - lastSwipeTime > 300) {
                handleSwipe();
                lastSwipeTime = currentTime;
            }
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                showNextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                showPreviousSlide();
            }
        }

        // Keyboard navigation
        slideshow.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                showPreviousSlide();
            } else if (e.key === 'ArrowRight') {
                showNextSlide();
            }
        });

        // Initialize first slide
        slides[0].setAttribute('aria-current', 'true');
        slides.forEach((slide, index) => {
            if (index !== 0) {
                slide.setAttribute('aria-hidden', 'true');
            }
        });

        // Start the slideshow
        startSlideshow();
    });
}); 