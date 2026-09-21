// ===== Sticky navbar compact state =====
const navbar = document.getElementById('navbar');
const onScroll = () => {
  if (window.scrollY > 12) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in-view'));
}

// ===== Contact form -> WhatsApp =====
const CLINIC_NUMBER = '919821968874';
const form = document.getElementById('enquiryForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const date = form.date.value;
  const message = form.message.value.trim();

  if (!name || !phone) {
    formNote.textContent = 'Please fill in your name and phone number.';
    formNote.style.color = '#c0392b';
    return;
  }

  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    formNote.textContent = 'Please enter a valid phone number.';
    formNote.style.color = '#c0392b';
    return;
  }

  let text = `Hello Dr. Meenakshi, I would like to enquire about a physiotherapy appointment.\n\nName: ${name}\nPhone: ${phone}`;
  if (date) text += `\nPreferred Date: ${date}`;
  if (message) text += `\nMessage: ${message}`;

  const url = `https://wa.me/${CLINIC_NUMBER}?text=${encodeURIComponent(text)}`;
  formNote.style.color = '#1C7C72';
  formNote.textContent = 'Opening WhatsApp…';
  window.open(url, '_blank', 'noopener');
  form.reset();
});
