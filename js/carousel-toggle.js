class PremiumCarousel {
            constructor() {
                this.currentSlide = 0;
                this.totalSlides = 5;
                this.autoPlayInterval = 6000;
                this.autoPlayTimer = null;
                this.isTransitioning = false;
                
                this.track = document.querySelector('.carousel-track');
                this.slides = document.querySelectorAll('.carousel-slide');
                this.indicators = document.querySelectorAll('.indicator');
                this.prevBtn = document.querySelector('.carousel-nav.prev');
                this.nextBtn = document.querySelector('.carousel-nav.next');
                
                this.init();
            }
            
            init() {
                this.bindEvents();
                this.startAutoPlay();
            }
            
            bindEvents() {
                this.prevBtn.addEventListener('click', () => {
                    if (!this.isTransitioning) {
                        this.prevSlide();
                        this.resetAutoPlay();
                    }
                });
                
                this.nextBtn.addEventListener('click', () => {
                    if (!this.isTransitioning) {
                        this.nextSlide();
                        this.resetAutoPlay();
                    }
                });
                
                this.indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => {
                        if (!this.isTransitioning && index !== this.currentSlide) {
                            this.goToSlide(index);
                            this.resetAutoPlay();
                        }
                    });
                });
                
                // Pause auto-play on hover
                document.querySelector('.hero-carousel').addEventListener('mouseenter', () => {
                    this.stopAutoPlay();
                });
                
                document.querySelector('.hero-carousel').addEventListener('mouseleave', () => {
                    this.startAutoPlay();
                });
                
                // Touch/swipe support
                let startX = 0;
                let endX = 0;
                let startY = 0;
                let endY = 0;
                
                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                });
                
                this.track.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    endY = e.changedTouches[0].clientY;
                    
                    const deltaX = startX - endX;
                    const deltaY = Math.abs(startY - endY);
                    
                    // Only trigger if horizontal swipe is more significant than vertical
                    if (Math.abs(deltaX) > 50 && deltaY < 100 && !this.isTransitioning) {
                        if (deltaX > 0) {
                            this.nextSlide();
                        } else {
                            this.prevSlide();
                        }
                        this.resetAutoPlay();
                    }
                });
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (!this.isTransitioning) {
                        if (e.key === 'ArrowLeft') {
                            this.prevSlide();
                            this.resetAutoPlay();
                        } else if (e.key === 'ArrowRight') {
                            this.nextSlide();
                            this.resetAutoPlay();
                        }
                    }

                });
            }
            
            goToSlide(slideIndex) {
                if (this.isTransitioning) return;
                
                this.isTransitioning = true;
                
                // Remove active class from current slide and indicator
                this.slides[this.currentSlide].classList.remove('active');
                this.indicators[this.currentSlide].classList.remove('active');
                
                // Update current slide
                this.currentSlide = slideIndex;
                
                // Add active class to new slide and indicator
                this.slides[this.currentSlide].classList.add('active');
                this.indicators[this.currentSlide].classList.add('active');
                
                // Move the track
                this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
                
                // Reset transition flag
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 800);
            }
            
            nextSlide() {
                const nextIndex = (this.currentSlide + 1) % this.totalSlides;
                this.goToSlide(nextIndex);
            }
            
            prevSlide() {
                const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.goToSlide(prevIndex);
            }
            
            startAutoPlay() {
                this.autoPlayTimer = setInterval(() => {
                    if (!this.isTransitioning) {
                        this.nextSlide();
                    }
                }, this.autoPlayInterval);
            }
            
            stopAutoPlay() {
                if (this.autoPlayTimer) {
                    clearInterval(this.autoPlayTimer);
                    this.autoPlayTimer = null;
                }
            }
            
            resetAutoPlay() {
                this.stopAutoPlay();
                setTimeout(() => {
                    this.startAutoPlay();
                }, 1000);
            }
        }
        
        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new PremiumCarousel();
        });






        // Audio play on button click

        function playAudio() {
      const audio = document.getElementById("mission-audio");
      audio.play();
    }












































    // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, delay);
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });

        // Animated counters
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }

        // Trigger counter animation when footer is visible
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    footerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        footerObserver.observe(document.querySelector('.footer'));

        // Newsletter form interaction
        document.querySelector('.newsletter-btn').addEventListener('click', function(e) {
            e.preventDefault();
            const input = document.querySelector('.newsletter-input');
            if (input.value.trim()) {
                this.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                this.style.background = '#28a745';
                input.value = '';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-paper-plane"></i> Subscribe';
                    this.style.background = '';
                }, 3000);
            }
        });

        // Prevent drag and select
        document.querySelectorAll('img, a').forEach(element => {
            element.style.webkitUserDrag = 'none';
            element.style.webkitUserSelect = 'none';
            element.style.mozUserSelect = 'none';
            element.style.msUserSelect = 'none';
            element.style.userSelect = 'none';
        });