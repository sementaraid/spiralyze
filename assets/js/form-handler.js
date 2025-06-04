/**
 * Form Input Handler
 * Handles all form input related functionality
 */

class FormHandler {
  constructor() {
    this.init();
  }

  init() {
    this.setupClickHandler();
    this.setupSelectHandlers();
  }

  setupClickHandler() {
    document.addEventListener('click', (e) => {
      // Get currently focused element
      const focusedElement = document.activeElement;

      if (focusedElement?.closest('.outlined-input-wrapper')) {
        const wrapper = focusedElement.closest('.outlined-input-wrapper');
        const label = wrapper.querySelector('label');
        const legend = wrapper.querySelector('legend');

        // Add active class to label and legend
        if (label) {
          label.classList.add('active');
        }
        if (legend) {
          legend.classList.add('active');
        }
      }

      // Remove active classes when clicking outside
      const allWrappers = document.querySelectorAll('.outlined-input-wrapper');
      allWrappers.forEach(wrapper => {
        if (!wrapper.contains(e.target)) {
          const input = wrapper.querySelector('input, select');
          const label = wrapper.querySelector('label');
          const legend = wrapper.querySelector('legend');

          // Only remove active if input/select is empty or default value
          if (input && ((input.tagName === 'INPUT' && !input.value) ||
              (input.tagName === 'SELECT' && input.selectedIndex === 0))) {
            if (label) {
              label.classList.remove('active');
            }
            if (legend) {
              legend.classList.remove('active');
            }
          }
        }
      });
    });
  }

  setupSelectHandlers() {
    document.querySelectorAll('.outlined-input-wrapper select').forEach(select => {
      select.addEventListener('change', function() {
        const wrapper = this.closest('.outlined-input-wrapper');
        const label = wrapper.querySelector('label');
        const legend = wrapper.querySelector('legend');
        
        if (this.selectedIndex > 0) {
          label?.classList.add('active');
          legend?.classList.add('active');
        } else {
          label?.classList.remove('active');
          legend?.classList.remove('active');
        }
      });
    });
  }
}