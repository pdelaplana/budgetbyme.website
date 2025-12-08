document.addEventListener('DOMContentLoaded', function() {
    // =========================================
    // Visual Carousel Logic
    // =========================================
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    const moveToSlide = (currentSlide, targetSlide, targetDot) => {
        // Update Slide Classes
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
        
        // Update Dot Classes
        const currentDot = dotsNav.querySelector('.current-slide');
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    // Dot Navigation
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(currentSlide, targetSlide, targetDot);
        resetAutoPlay();
    });

    // Auto Play
    let autoPlayInterval;
    
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            const currentSlide = track.querySelector('.current-slide');
            let nextSlide = currentSlide.nextElementSibling;
            let nextDot = dotsNav.querySelector('.current-slide').nextElementSibling;

            // Loop back to start
            if (!nextSlide) {
                nextSlide = slides[0];
                nextDot = dots[0];
            }

            moveToSlide(currentSlide, nextSlide, nextDot);
        }, 5000);
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    // Initialize
    startAutoPlay();

    // =========================================
    // Smooth Scroll for Anchors
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================
    // Feedback Form Handling with ProductQuarry API
    // =========================================
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        console.log('Feedback form found, attaching event listener');
        
        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Form submitted, processing...');
            
            const btn = feedbackForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            const inputs = feedbackForm.querySelectorAll('input, textarea');
            
            // Get form data
            const name = feedbackForm.querySelector('input[type="text"]').value.trim();
            const email = feedbackForm.querySelector('input[type="email"]').value.trim();
            const message = feedbackForm.querySelector('textarea').value.trim();
            
            console.log('Form data:', { name, email, messageLength: message.length });
            
            // Client-side validation
            if (message.length < 10) {
                alert('Please provide more details in your feedback (at least 10 characters).');
                return;
            }
            
            // Disable form during submission
            btn.disabled = true;
            btn.textContent = 'Sending...';
            inputs.forEach(input => input.disabled = true);
            
            try {
                console.log('Sending to ProductQuarry API...');
                
                // Submit to ProductQuarry API
                const response = await fetch('https://productquarry.vercel.app/api/feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        board_slug: 'budget-by-me',
                        title: `Feedback from ${name}`,
                        description: message,
                        type: 'feedback',
                        user_email: email,
                    }),
                });
                
                const result = await response.json();
                console.log('API response:', result);
                
                if (response.ok) {
                    // Success
                    btn.textContent = 'Sent! ✓';
                    btn.style.backgroundColor = '#047857';
                    
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                        inputs.forEach(input => input.disabled = false);
                        feedbackForm.reset();
                        alert('Thank you for your feedback! We appreciate your input and will review it carefully.');
                    }, 2000);
                } else {
                    // Error from API
                    throw new Error(result.error || 'Failed to submit feedback');
                }
            } catch (error) {
                console.error('Feedback submission error:', error);
                
                // Re-enable form
                btn.textContent = originalText;
                btn.disabled = false;
                inputs.forEach(input => input.disabled = false);
                
                // User-friendly error message
                let errorMessage = 'Unable to submit feedback. Please try again later.';
                if (error.message.includes('fetch') || error.message.includes('Network')) {
                    errorMessage = 'Network error. Please check your connection and try again.';
                }
                
                alert(errorMessage);
            }
        });
    } else {
        console.error('Feedback form not found!');
    }
});
