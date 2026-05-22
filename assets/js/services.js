// ---- Interactive Service Showcase ----
function selectService(index, clickedBtn) {
  // Update desktop tab active states
  document.querySelectorAll('#service-tabs-desktop .service-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });

  // Update mobile pill active states
  document.querySelectorAll('.service-tab-mobile').forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });

  // Fade out current, fade in new preview
  const previews = document.querySelectorAll('.svc-preview-item');
  previews.forEach(p => p.classList.remove('active'));
  
  const target = document.querySelector(`.svc-preview-item[data-index="${index}"]`);
  if (target) {
    // tiny double requestAnimationFrame to ensure CSS transition fires correctly
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.classList.add('active');
      });
    });
  }
}

// Bind to window to allow HTML inline event handlers to trigger it
window.selectService = selectService;
