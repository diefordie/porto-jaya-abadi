// ---- Portfolio filter ----
function filterPortfolio(filter) {
  // Update buttons
  document.querySelectorAll('.portfolio-filter-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-blue-600', 'text-white');
    btn.classList.add('border', 'border-slate-200', 'hover:border-blue-600');
  });

  // Find the clicked button or the one with the matching onclick
  const clickedBtn = Array.from(document.querySelectorAll('.portfolio-filter-btn'))
    .find(btn => btn.getAttribute('onclick').includes(`'${filter}'`));

  if (clickedBtn) {
    clickedBtn.classList.add('active', 'bg-blue-600', 'text-white');
    clickedBtn.classList.remove('border', 'border-slate-200', 'hover:border-blue-600');
  }

  document.querySelectorAll('.portfolio-item').forEach(item => {
    if (filter === 'all' || item.classList.contains(filter)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// ---- Contact form ----
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const currentLang = window.currentLang || 'id';
  if (btn) {
    btn.textContent = currentLang === 'en' ? 'Sending...' : 'Mengirim...';
    btn.disabled = true;
    setTimeout(() => {
      const successMsg = document.getElementById('form-success');
      if (successMsg) successMsg.classList.remove('hidden');
      e.target.reset();
      btn.textContent = currentLang === 'en' ? 'Send Quote Request' : 'Kirim Permintaan Penawaran';
      btn.disabled = false;
    }, 1500);
  }
}

// ---- Intersection Observer for bar animations ----
let barObserver;
function initMain() {
  if (barObserver) barObserver.disconnect();

  barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.animationPlayState = 'running';
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.animationPlayState = 'paused';
  });

  const aboutSection = document.getElementById('about');
  if (aboutSection) barObserver.observe(aboutSection);
}

// Bind to window for inline HTML access
window.handleSubmit = handleSubmit;
window.filterPortfolio = filterPortfolio;
window.initMain = initMain;

// Fallback if not using component loader
document.addEventListener('DOMContentLoaded', initMain);
