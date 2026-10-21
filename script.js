/* Maison Aurelia — light progressive enhancement (mobile nav, reveal, lightbox) */
(function () {
  'use strict';

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Lightbox
  var box = document.getElementById('lightbox');
  if (box) {
    var boxImg = box.querySelector('img');
    var boxCap = box.querySelector('figcaption');
    var lastFocus = null;

    var close = function () {
      box.classList.remove('is-open');
      box.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };

    document.querySelectorAll('[data-lightbox]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        lastFocus = btn;
        boxImg.src = btn.getAttribute('data-lightbox');
        boxImg.alt = btn.getAttribute('data-caption') || '';
        boxCap.textContent = btn.getAttribute('data-caption') || '';
        box.classList.add('is-open');
        box.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        box.querySelector('.lightbox__close').focus();
      });
    });

    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.classList.contains('lightbox__close')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && box.classList.contains('is-open')) close();
    });
  }

  // Contact form (front-end demo — connect to your backend/service of choice)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      if (!form.checkValidity()) { form.reportValidity(); return; }
      status.textContent = 'Thank you. Your message has been received — we will reply within one business day.';
      form.reset();
    });
  }
})();
