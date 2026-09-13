/* ==========================================================================
   JAYABHERI PINNACLE — SCRIPT
   Table of contents:
   1. DOM selections
   2. Utilities (debounce/throttle)
   3. Preloader
   4. Icons init
   5. Navigation (scroll state, active link, smooth scroll)
   6. Mobile menu
   7. Scroll progress bar
   8. Back to top
   9. IntersectionObserver reveal animations
   10. Counter animation
   11. Parallax (statement / lifestyle backgrounds)
   12. Amenities filter
   13. Gallery + lightbox
   14. Form validation + simulated submit
   15. Success modal
   16. Init
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- 1. DOM selections ---------- */
  const preloader = document.getElementById('preloader');
  const scrollProgress = document.getElementById('scrollProgress');
  const nav = document.getElementById('siteNav');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinkEls = document.querySelectorAll('.nav__link');
  const mobileLinkEls = document.querySelectorAll('.mobile-menu__link');
  const backToTop = document.getElementById('backToTop');
  const heroSection = document.getElementById('hero');
  const revealEls = document.querySelectorAll('.reveal');
  const counterEls = document.querySelectorAll('.stat__num');
  const parallaxEls = document.querySelectorAll('[data-parallax]');

  const filterButtons = document.querySelectorAll('.filter-btn');
  const amenityCards = document.querySelectorAll('.amenity-card');

  const galleryItems = document.querySelectorAll('.gallery__item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  const enquiryForm = document.getElementById('enquiryForm');
  const successModal = document.getElementById('successModal');
  const modalClose = document.getElementById('modalClose');
  const modalDone = document.getElementById('modalDone');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 2. Utilities ---------- */
  function throttle(fn, wait) {
    let isWaiting = false;
    return function (...args) {
      if (isWaiting) return;
      fn.apply(this, args);
      isWaiting = true;
      setTimeout(() => { isWaiting = false; }, wait);
    };
  }

  /* ---------- 3. Preloader ---------- */
  function initPreloader() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('is-hidden');
        heroSection.classList.add('is-loaded');
      }, 500);
    });

    // Fallback in case the load event is delayed by slow external assets.
    setTimeout(() => {
      preloader.classList.add('is-hidden');
      heroSection.classList.add('is-loaded');
    }, 2500);
  }

  /* ---------- 4. Icons init ---------- */
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /* ---------- 5. Navigation ---------- */
  function initNavScrollState() {
    const onScroll = throttle(() => {
      if (window.scrollY > 40) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }, 100);
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  function initActiveNavLink() {
    const sections = Array.from(navLinkEls)
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            navLinkEls.forEach((link) => {
              link.classList.toggle('is-active', link.getAttribute('href') === id);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ---------- 6. Mobile menu ---------- */
  function initMobileMenu() {
    function closeMenu() {
      mobileMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }

    function openMenu() {
      mobileMenu.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
    }

    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    mobileLinkEls.forEach((link) => link.addEventListener('click', closeMenu));
  }

  /* ---------- 7. Scroll progress bar ---------- */
  function initScrollProgress() {
    const onScroll = throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = `${progress}%`;
    }, 50);
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  /* ---------- 8. Back to top ---------- */
  function initBackToTop() {
    const onScroll = throttle(() => {
      backToTop.classList.toggle('is-visible', window.scrollY > 600);
    }, 100);
    window.addEventListener('scroll', onScroll);

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- 9. Reveal animations ---------- */
  function initRevealAnimations() {
    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------- 10. Counter animation ---------- */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }

    if (prefersReducedMotion) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    requestAnimationFrame(tick);
  }

  function initCounters() {
    if (!counterEls.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counterEls.forEach((el) => observer.observe(el));
  }

  /* ---------- 11. Parallax ---------- */
  function initParallax() {
    if (prefersReducedMotion || !parallaxEls.length) return;

    const onScroll = throttle(() => {
      parallaxEls.forEach((el) => {
        const rect = el.parentElement.getBoundingClientRect();
        const speed = 0.15;
        const offset = rect.top * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    }, 16);

    window.addEventListener('scroll', onScroll);
  }

  /* ---------- 12. Amenities filter ---------- */
  function initAmenitiesFilter() {
    if (!filterButtons.length) return;

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterButtons.forEach((b) => {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });

        amenityCards.forEach((card) => {
          const matches = filter === 'all' || card.getAttribute('data-category') === filter;
          card.classList.toggle('is-hidden', !matches);
        });
      });
    });
  }

  /* ---------- 13. Gallery + lightbox ---------- */
  function initGalleryLightbox() {
    if (!galleryItems.length || !lightbox) return;

    const images = Array.from(galleryItems).map((item) => {
      const img = item.querySelector('img');
      return { src: img.src, alt: img.alt };
    });

    let currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      updateLightboxImage();
      lightbox.hidden = false;
      document.body.classList.add('no-scroll');
      lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.classList.remove('no-scroll');
    }

    function updateLightboxImage() {
      const { src, alt } = images[currentIndex];
      lightboxImage.src = src;
      lightboxImage.alt = alt;
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightboxImage();
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightboxImage();
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener('click', showPrev);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }

  /* ---------- 14. Form validation + simulated submit ---------- */
  function initFormValidation() {
    if (!enquiryForm) return;

    const fields = {
      fullName: {
        el: document.getElementById('fullName'),
        validate: (value) => value.trim().length >= 2,
        message: 'Please enter your full name.',
      },
      phone: {
        el: document.getElementById('phone'),
        validate: (value) => /^[0-9]{10}$/.test(value.trim()),
        message: 'Please enter a valid 10-digit phone number.',
      },
      email: {
        el: document.getElementById('email'),
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
        message: 'Please enter a valid email address.',
      },
      interest: {
        el: document.getElementById('interest'),
        validate: (value) => value.trim().length > 0,
        message: 'Please select a configuration.',
      },
    };

    function showError(name, message) {
      const field = fields[name];
      const errorEl = document.getElementById(`error-${name}`);
      field.el.closest('.form-field').classList.add('has-error');
      field.el.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
    }

    function clearError(name) {
      const field = fields[name];
      const errorEl = document.getElementById(`error-${name}`);
      field.el.closest('.form-field').classList.remove('has-error');
      field.el.removeAttribute('aria-invalid');
      errorEl.textContent = '';
    }

    function validateField(name) {
      const field = fields[name];
      const isValid = field.validate(field.el.value);
      isValid ? clearError(name) : showError(name, field.message);
      return isValid;
    }

    Object.keys(fields).forEach((name) => {
      const el = fields[name].el;
      el.addEventListener('blur', () => validateField(name));
      el.addEventListener('input', () => {
        if (el.closest('.form-field').classList.contains('has-error')) validateField(name);
      });
    });

    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const results = Object.keys(fields).map((name) => validateField(name));
      const isFormValid = results.every(Boolean);

      if (!isFormValid) {
        const firstInvalid = enquiryForm.querySelector('.has-error input, .has-error select');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      handleFormSubmit();
    });

    function handleFormSubmit() {
      // ------------------------------------------------------------------
      // FRONTEND-ONLY SIMULATION.
      // To connect a real backend/CRM, replace this block with, e.g.:
      //
      //   fetch('/api/enquiries', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(Object.fromEntries(new FormData(enquiryForm))),
      //   }).then(...).catch(...);
      // ------------------------------------------------------------------
      const submitBtn = enquiryForm.querySelector('.enquiry-form__submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting…';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        initIcons();
        enquiryForm.reset();
        openModal();
      }, 700);
    }
  }

  /* ---------- 15. Success modal ---------- */
  function initModal() {
    if (!successModal) return;

    modalClose.addEventListener('click', closeModal);
    modalDone.addEventListener('click', closeModal);
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (!successModal.hidden && e.key === 'Escape') closeModal();
    });
  }

  function openModal() {
    successModal.hidden = false;
    document.body.classList.add('no-scroll');
    modalClose.focus();
  }

  function closeModal() {
    successModal.hidden = true;
    document.body.classList.remove('no-scroll');
  }

  /* ---------- 16. Init ---------- */
  function init() {
    document.getElementById('year').textContent = new Date().getFullYear();

    initPreloader();
    initIcons();
    initNavScrollState();
    initActiveNavLink();
    initMobileMenu();
    initScrollProgress();
    initBackToTop();
    initRevealAnimations();
    initCounters();
    initParallax();
    initAmenitiesFilter();
    initGalleryLightbox();
    initFormValidation();
    initModal();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
