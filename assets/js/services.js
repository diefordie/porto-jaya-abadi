// ---- Interactive Service Showcase ----
function selectService(index, clickedBtn) {
  // Update desktop tab active states
  const desktopTabs = document.querySelectorAll('#service-tabs-desktop .service-tab');
  if (desktopTabs.length > 0) {
    desktopTabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });
  }

  // Update mobile pill active states
  const mobileTabs = document.querySelectorAll('.service-tab-mobile');
  if (mobileTabs.length > 0) {
    mobileTabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });
  }

  // Fade out current, fade in new preview
  const previews = document.querySelectorAll('.svc-preview-item');
  if (previews.length > 0) {
    previews.forEach(p => p.classList.remove('active'));
    const target = document.querySelector(`.svc-preview-item[data-index="${index}"]`);
    if (target) {
      // tiny RAF to ensure CSS transition fires
      requestAnimationFrame(() => {
        requestAnimationFrame(() => target.classList.add('active'));
      });
    }
  }
}

// Bind to window for inline HTML access
window.selectService = selectService;
