document.addEventListener('click', function(e) {
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
      const input = wrapper.querySelector('input');
      const label = wrapper.querySelector('label');
      const legend = wrapper.querySelector('legend');

      // Only remove active if input is empty
      if (input && !input.value) {
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
