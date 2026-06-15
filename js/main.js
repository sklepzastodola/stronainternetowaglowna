// Mobile nav toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // zamknij po kliknięciu linka
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Aktywny link w nav
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// Formularz kontaktowy
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const original = btn.textContent;
    btn.textContent = 'Wysyłanie...';
    btn.disabled = true;

    // Podmień action na swój endpoint Formspree: https://formspree.io/f/TWÓJ_ID
    const action = form.getAttribute('action');
    if (action && action !== '#') {
      try {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          btn.textContent = 'Wysłano ✓';
          btn.style.background = '#4ade80';
          form.reset();
        } else {
          throw new Error();
        }
      } catch {
        btn.textContent = 'Błąd — spróbuj ponownie';
        btn.style.background = '#f87171';
        btn.disabled = false;
      }
    } else {
      // tryb demo
      setTimeout(() => {
        btn.textContent = 'Wysłano ✓';
        btn.style.background = '#4ade80';
      }, 600);
    }
  });
}
