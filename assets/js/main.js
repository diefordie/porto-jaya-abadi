// ---- Portfolio filter ----
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active','bg-blue-600','text-white');
        b.classList.add('bg-white','border','border-slate-200','text-slate-600');
      });
      btn.classList.add('active','bg-blue-600','text-white');
      btn.classList.remove('bg-white','border','border-slate-200','text-slate-600');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.portfolio-item').forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

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
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
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
  if (aboutSection) observer.observe(aboutSection);
});

// Bind to window for inline HTML access
window.handleSubmit = handleSubmit;
