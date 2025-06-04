/**
 * Slider
 * Handles image slider functionality with navigation and keyboard controls
 */

class Slider {
  constructor() {
    this.slider = document.querySelector('.slider-wrapper');
    this.slides = document.querySelectorAll('.slide');
    this.prevBtn = document.querySelector('.slider-prev');
    this.nextBtn = document.querySelector('.slider-next');
    this.dotsContainer = document.querySelector('.slider-dots');
    
    this.currentSlide = 0;
    this.slideCount = this.slides.length;
    this.isAnimating = false;
    
    this.init();
  }

  init() {
    if (!this.slider || this.slides.length === 0) return;
    
    // Create dots
    this.slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      this.dotsContainer.appendChild(dot);
    });

    // Add event listeners
    this.prevBtn.addEventListener('click', () => this.navigate('prev'));
    this.nextBtn.addEventListener('click', () => this.navigate('next'));
    this.dotsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('slider-dot')) {
        const dots = [...this.dotsContainer.children];
        const index = dots.indexOf(e.target);
        this.goToSlide(index);
      }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.navigate('prev');
      if (e.key === 'ArrowRight') this.navigate('next');
    });

    // Set initial position and button states
    this.updateSliderPosition();
    this.updateNavigationState();
  }

  navigate(direction) {
    if (this.isAnimating) return;
    
    // Check boundaries
    if (direction === 'prev' && this.currentSlide === 0) return;
    if (direction === 'next' && this.currentSlide === this.slideCount - 1) return;
    
    if (direction === 'prev') {
      this.currentSlide--;
    } else {
      this.currentSlide++;
    }
    
    this.goToSlide(this.currentSlide);
  }

  goToSlide(index) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    this.currentSlide = index;
    this.updateSliderPosition();
    this.updateDots();
    this.updateNavigationState();

    // Reset animating flag after transition
    setTimeout(() => {
      this.isAnimating = false;
    }, 300); // Match the CSS transition duration
  }

  updateSliderPosition() {
    this.slides.forEach((slide, index) => {
      const offset = 100 * (index - this.currentSlide);
      slide.style.transform = `translateX(${offset}%)`;
      
      // Improve performance by only showing nearby slides
      if (Math.abs(offset) <= 100) {
        slide.style.display = 'block';
      } else {
        slide.style.display = 'none';
      }
    });
  }

  updateDots() {
    const dots = this.dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
  }

  updateNavigationState() {
    // Disable/enable previous button
    if (this.currentSlide === 0) {
      this.prevBtn.setAttribute('disabled', 'disabled');
      this.prevBtn.classList.add('disabled');
    } else {
      this.prevBtn.removeAttribute('disabled');
      this.prevBtn.classList.remove('disabled');
    }

    // Disable/enable next button
    if (this.currentSlide === this.slideCount - 1) {
      this.nextBtn.setAttribute('disabled', 'disabled');
      this.nextBtn.classList.add('disabled');
    } else {
      this.nextBtn.removeAttribute('disabled');
      this.nextBtn.classList.remove('disabled');
    }
  }
}