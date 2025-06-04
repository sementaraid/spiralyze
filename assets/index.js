/**
 * Main JavaScript Entry Point
 * Initializes all components when the DOM is fully loaded
 */

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize form inputs
  if (typeof FormHandler === 'function') {
    new FormHandler();
  }
  
  // Initialize slider if it exists
  if (document.querySelector('.slider-wrapper') && typeof Slider === 'function') {
    new Slider();
  }
});
