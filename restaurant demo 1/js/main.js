/* ============================================
   THE BEACH HOUSE — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initDropdowns();
  initFAQAccordion();
  initContactForm();
  initScrollAnimations();
  initScrollToTop();
  highlightToday();
});

/* ---------- Header Scroll Effect ---------- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on load
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.mobile-overlay');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close on nav link click (mobile)
  nav.querySelectorAll('.nav-link:not(.nav-dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

/* ---------- Dropdown Menus ---------- */
function initDropdowns() {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const toggle = item.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;

    // Mobile: click to toggle
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('mobile-open');
      }
    });
  });
}

/* ---------- FAQ Accordion ---------- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active', !isActive);
    });
  });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    let isValid = true;

    [name, email, message].forEach(field => {
      if (field && !field.value.trim()) {
        field.style.borderColor = '#C41E3A';
        isValid = false;
      } else if (field) {
        field.style.borderColor = '';
      }
    });

    if (email && email.value && !isValidEmail(email.value)) {
      email.style.borderColor = '#C41E3A';
      isValid = false;
    }

    if (!isValid) return;

    // Show success message
    form.style.display = 'none';
    const successEl = document.querySelector('.form-success');
    if (successEl) successEl.classList.add('show');
  });

  // Remove error styling on input
  const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ---------- Scroll to Top ---------- */
function initScrollToTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Highlight Today in Hours Table ---------- */
function highlightToday() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  
  document.querySelectorAll('.hours-table tr[data-day]').forEach(row => {
    if (row.dataset.day === today) {
      row.classList.add('today');
    }
  });
}

/* ---------- Menu Category Filter (Menu Page) ---------- */
function filterMenu(category) {
  const buttons = document.querySelectorAll('.menu-cat-btn');
  const sections = document.querySelectorAll('.menu-section-block');

  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category || (category === 'all' && btn.dataset.category === 'all'));
  });

  sections.forEach(section => {
    if (category === 'all') {
      section.style.display = 'block';
    } else {
      section.style.display = section.dataset.category === category ? 'block' : 'none';
    }
  });
}

/* ---------- FAQ Category Filter ---------- */
function filterFAQ(category) {
  const buttons = document.querySelectorAll('.faq-cat-btn');
  const items = document.querySelectorAll('.faq-item');

  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });

  items.forEach(item => {
    if (category === 'all') {
      item.style.display = 'block';
    } else {
      item.style.display = item.dataset.category === category ? 'block' : 'none';
    }
    item.classList.remove('active');
  });
}
