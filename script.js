const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const navLinks = document.querySelectorAll('.nav-link, .dropdown-menu a');
const slides = document.querySelectorAll('.slide');
const dotsWrap = document.querySelector('.dots');
const sliderBtns = document.querySelectorAll('.slider-btn');
const revealEls = document.querySelectorAll('.reveal');
const floatingTop = document.querySelector('.floating-top');
const sections = document.querySelectorAll('main section[id], header[id]');
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');
const modalButtons = document.querySelectorAll('.open-modal');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close');
const form = document.getElementById('demoForm');
const alertButtons = document.querySelectorAll('.alert-btn');
const testimonials = document.querySelectorAll('.testimonial');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });
}

dropdownToggles.forEach(btn => {
  btn.addEventListener('click', () => {
    if (window.innerWidth <= 980) {
      btn.parentElement.classList.toggle('open');
    }
  });
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  });
});

let currentSlide = 0;
function renderDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `dot ${index === currentSlide ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsWrap.appendChild(dot);
  });
}
function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  renderDots();
}
sliderBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    goToSlide(currentSlide + (btn.dataset.dir === 'next' ? 1 : -1));
  });
});
if (slides.length) {
  renderDots();
  setInterval(() => goToSlide(currentSlide + 1), 4500);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });
revealEls.forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  floatingTop.classList.toggle('show', window.scrollY > 500);

  let current = 'home';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('active', href === current);
  });
});

floatingTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

galleryItems.forEach(img => {
  img.parentElement.addEventListener('click', () => {
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
function closeLightbox() {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

actionCloseOnEscape();
function actionCloseOnEscape() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeLightbox();
      modals.forEach(modal => modal.classList.remove('show'));
    }
  });
}

modalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.modal);
    if (target) {
      target.classList.add('show');
      target.setAttribute('aria-hidden', 'false');
    }
  });
});
modalCloses.forEach(button => {
  button.addEventListener('click', () => {
    button.closest('.modal').classList.remove('show');
  });
});
modals.forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('show');
  });
});

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = new FormData(form).get('name') || 'Parent';
    alert(`Thanks, ${name}! This demo form works visually, but it does not send real data.`);
    form.reset();
  });
}

alertButtons.forEach(button => {
  button.addEventListener('click', () => alert(button.dataset.message));
});

let testimonialIndex = 0;
if (testimonials.length) {
  setInterval(() => {
    testimonials[testimonialIndex].classList.remove('active');
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    testimonials[testimonialIndex].classList.add('active');
  }, 5000);
}
