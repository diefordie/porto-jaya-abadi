// ---- FAQ accordion ----
function initFAQ() {
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    // Remove old listener if any
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', () => {
      const item = newBtn.parentElement;
      const wasOpen = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // Open if not previously open
      if (!wasOpen) {
        item.classList.add('active');
      }
    });
  });
}

// Bind to window
window.initFAQ = initFAQ;

// Fallback
document.addEventListener('DOMContentLoaded', initFAQ);
