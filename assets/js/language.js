// ---- Language switcher and state ----
window.currentLang = 'id';

function setLang(lang) {
  window.currentLang = lang;
  document.documentElement.lang = lang === 'id' ? 'id' : 'en';

  // Toggle visible translations
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-id-text') || el.getAttribute('data-id');
    if (text && el.tagName !== 'OPTION') {
      el.textContent = text;
    }
    if (text && el.tagName === 'OPTION') {
      el.textContent = text;
    }
  });

  // Handle placeholders
  document.querySelectorAll('[placeholder]').forEach(el => {
    if (lang === 'en') {
      if (!el._origPlaceholder) {
        el._origPlaceholder = el.placeholder;
      }
      // If there's a custom english placeholder translation, apply it, else fallback
      const enPlaceholder = el.getAttribute('data-en-placeholder');
      if (enPlaceholder) {
        el.placeholder = enPlaceholder;
      }
    } else {
      if (el._origPlaceholder) {
        el.placeholder = el._origPlaceholder;
      }
    }
  });

  // Update consultation buttons
  document.querySelectorAll('a[href="#contact"]').forEach(a => {
    const span = a.querySelector('span');
    if (span && span.textContent.includes('Konsultasi')) {
      span.textContent = lang === 'en' ? 'Free Consultation' : 'Konsultasi Gratis';
    } else if (span && span.textContent.includes('Consultation')) {
      span.textContent = lang === 'en' ? 'Free Consultation' : 'Konsultasi Gratis';
    }
  });

  // Toggle active class on language toggle buttons
  ['btn-id', 'btn-en', 'btn-id-m', 'btn-en-m'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    if ((lang === 'id' && id.includes('id')) || (lang === 'en' && id.includes('en'))) {
      btn.classList.add('active', 'bg-blue-600', 'text-white');
      btn.classList.remove('text-slate-400');
    } else {
      btn.classList.remove('active', 'bg-blue-600', 'text-white');
      btn.classList.add('text-slate-400');
    }
  });
}

// Bind to window to allow HTML inline event handlers to trigger it
window.setLang = setLang;
