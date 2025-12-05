// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    const waitlistForm = document.getElementById('waitlist-form');
    const emailInput = document.getElementById('email');
    const successModal = document.getElementById('success-modal');
    const modalClose = document.querySelector('.modal-close');
    const joinWaitlistBtn = document.getElementById('join-waitlist-btn');
    const waitlistCountElement = document.getElementById('waitlist-count');

    // Smooth scroll for CTA button
    joinWaitlistBtn.addEventListener('click', function() {
        document.getElementById('waitlist-section').scrollIntoView({
            behavior: 'smooth'
        });
        emailInput.focus();
    });

    // Form submission
    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Show loading state
        const submitButton = waitlistForm.querySelector('.form-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Joining...';
        submitButton.disabled = true;

        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            // Reset form
            emailInput.value = '';
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Update counter (simulate new signup)
            updateWaitlistCount();

            // Show success modal
            showSuccessModal();

            // Store email in localStorage for analytics (optional)
            storeEmailLocally(email);
        }, 1500);
    });

    // Modal close handlers
    modalClose.addEventListener('click', closeModal);
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.style.display === 'block') {
            closeModal();
        }
    });

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show error message
    function showError(message) {
        // Remove existing error
        const existingError = waitlistForm.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create error element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            text-align: center;
        `;
        errorDiv.textContent = message;

        // Insert after form group
        const formGroup = waitlistForm.querySelector('.form-group');
        formGroup.insertAdjacentElement('afterend', errorDiv);

        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv && errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // Show success modal
    function showSuccessModal() {
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Update waitlist counter
    function updateWaitlistCount() {
        let currentCount = parseInt(waitlistCountElement.textContent);
        currentCount += 1;
        waitlistCountElement.textContent = currentCount;
        
        // Store updated count
        localStorage.setItem('waitlistCount', currentCount);
    }

    // Store email locally for analytics
    function storeEmailLocally(email) {
        const emails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('waitlistEmails', JSON.stringify(emails));
        }
    }

    // Initialize counter from localStorage
    function initializeCounter() {
        const storedCount = localStorage.getItem('waitlistCount');
        if (storedCount) {
            waitlistCountElement.textContent = storedCount;
        }
    }

    // Animate elements on scroll
    function animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Animate feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // Animate carousel container
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.style.opacity = '0';
            carouselContainer.style.transform = 'translateY(30px) scale(0.95)';
            carouselContainer.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
            observer.observe(carouselContainer);
        }

        // Animate rotating value propositions container
        const rotationContainer = document.querySelector('.rotation-container');
        if (rotationContainer) {
            rotationContainer.style.opacity = '0';
            rotationContainer.style.transform = 'translateY(30px)';
            rotationContainer.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
            observer.observe(rotationContainer);
        }
    }

    // Form input enhancements
    function enhanceFormInputs() {
        emailInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });

        emailInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });

        // Add transition to form group
        const formGroup = document.querySelector('.form-group');
        formGroup.style.transition = 'transform 0.2s ease';
    }

    // Screenshot Carousel functionality
    function initializeCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        let currentSlide = 1;
        let isTransitioning = false;

        // Auto-play settings
        let autoPlayInterval;
        const autoPlayDelay = 4000; // 4 seconds

        function showSlide(slideNumber) {
            if (isTransitioning) return;
            
            isTransitioning = true;
            
            // Update slides
            slides.forEach(slide => {
                slide.classList.remove('active');
                if (parseInt(slide.dataset.slide) === slideNumber) {
                    slide.classList.add('active');
                }
            });

            // Update indicators
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
                if (parseInt(indicator.dataset.slide) === slideNumber) {
                    indicator.classList.add('active');
                }
            });

            currentSlide = slideNumber;
            
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }

        function nextSlide() {
            const next = currentSlide >= slides.length ? 1 : currentSlide + 1;
            showSlide(next);
        }

        function prevSlide() {
            const prev = currentSlide <= 1 ? slides.length : currentSlide - 1;
            showSlide(prev);
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 2000); // Restart auto-play after 2 seconds
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 2000);
            });
        }

        // Indicator clicks
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const slideNumber = parseInt(indicator.dataset.slide);
                showSlide(slideNumber);
                stopAutoPlay();
                setTimeout(startAutoPlay, 2000);
            });
        });

        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoPlay);
            carouselContainer.addEventListener('mouseleave', startAutoPlay);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 2000);
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 2000);
            }
        });

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        if (carouselContainer) {
            carouselContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            carouselContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swiped left - show next slide
                    nextSlide();
                } else {
                    // Swiped right - show previous slide
                    prevSlide();
                }
                stopAutoPlay();
                setTimeout(startAutoPlay, 2000);
            }
        }

        // Start auto-play
        startAutoPlay();

        // Track carousel interactions for analytics
        function trackCarouselInteraction(action, slideNumber) {
            trackEvent('carousel_interaction', {
                action: action,
                slide_number: slideNumber,
                slide_content: slides[slideNumber - 1]?.querySelector('.slide-caption h4')?.textContent || 'Unknown'
            });
        }

        // Add tracking to navigation
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                trackCarouselInteraction('next_click', currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                trackCarouselInteraction('prev_click', currentSlide);
            });
        }

        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                trackCarouselInteraction('indicator_click', parseInt(indicator.dataset.slide));
            });
        });
    }

    // Value Propositions Tabs functionality
    function initializeValuePropTabs() {
        const sections = document.querySelectorAll('.rotation-section');
        const indicators = document.querySelectorAll('.rotation-indicator');
        let currentSection = 1;
        let isTransitioning = false;

        function showSection(sectionNumber) {
            if (isTransitioning) return;
            
            isTransitioning = true;
            
            // Update sections with fade effect
            sections.forEach(section => {
                section.classList.remove('active');
                if (parseInt(section.dataset.section) === sectionNumber) {
                    section.classList.add('active');
                }
            });

            // Update tab indicators
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
                if (parseInt(indicator.dataset.section) === sectionNumber) {
                    indicator.classList.add('active');
                }
            });

            currentSection = sectionNumber;
            
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }

        // Tab click handlers
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const sectionNumber = parseInt(indicator.dataset.section);
                if (sectionNumber !== currentSection) {
                    showSection(sectionNumber);
                    trackTabInteraction('tab_click', sectionNumber);
                }
            });
        });

        // Keyboard navigation
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('keydown', (e) => {
                let targetIndex = index;
                
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    targetIndex = (index + 1) % indicators.length;
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    targetIndex = index === 0 ? indicators.length - 1 : index - 1;
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    targetIndex = 0;
                } else if (e.key === 'End') {
                    e.preventDefault();
                    targetIndex = indicators.length - 1;
                }
                
                if (targetIndex !== index) {
                    indicators[targetIndex].focus();
                    const sectionNumber = parseInt(indicators[targetIndex].dataset.section);
                    showSection(sectionNumber);
                    trackTabInteraction('keyboard_nav', sectionNumber);
                }
            });
        });

        // Touch/swipe support for mobile tab switching
        let touchStartX = 0;
        let touchEndX = 0;

        const tabContainer = document.querySelector('.rotating-value-props');
        if (tabContainer) {
            tabContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            tabContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                let nextSection;
                if (diff > 0) {
                    // Swiped left - show next tab
                    nextSection = currentSection >= sections.length ? 1 : currentSection + 1;
                } else {
                    // Swiped right - show previous tab
                    nextSection = currentSection <= 1 ? sections.length : currentSection - 1;
                }
                showSection(nextSection);
                trackTabInteraction('swipe', nextSection);
            }
        }

        // Track tab interactions for analytics
        function trackTabInteraction(action, sectionNumber) {
            const sectionTitles = [
                'Never Go Over Budget Again',
                'Plan Years Ahead', 
                'Share & Collaborate',
                'Professional Results Without the Cost',
                'Turn Budget Stress Into Budget Confidence'
            ];
            
            trackEvent('value_prop_tab_interaction', {
                action: action,
                section_number: sectionNumber,
                section_title: sectionTitles[sectionNumber - 1] || 'Unknown'
            });
        }

        // Initialize first tab as active
        showSection(1);
    }

    // Initialize features
    initializeCounter();
    animateOnScroll();
    enhanceFormInputs();
    initializeCarousel();
    initializeValuePropTabs();

    // Analytics helpers (replace with actual analytics service)
    function trackEvent(eventName, properties = {}) {
        console.log('Event tracked:', eventName, properties);
        
        // Example: Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
        
        // Example: Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, properties);
        }
    }

    // Track page view
    trackEvent('page_view', {
        page_title: 'BudgetByMe Landing Page',
        page_location: window.location.href
    });

    // Track CTA clicks
    joinWaitlistBtn.addEventListener('click', function() {
        trackEvent('cta_click', {
            cta_location: 'hero',
            cta_text: 'Join the Waitlist - It\'s Free'
        });
    });

    // Track form submissions
    waitlistForm.addEventListener('submit', function() {
        trackEvent('waitlist_signup', {
            form_location: 'main_form'
        });
    });
});