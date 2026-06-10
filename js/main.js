/* ============================================================
 Tiger Aura Resort, v2 Shared JavaScript
 ============================================================ */

/* ---- Navbar scroll behaviour ---- */
(function () {
 const navbar = document.getElementById('navbar');
 if (!navbar) return;
 function onScroll() {
 if (window.scrollY > 40) {
 navbar.classList.add('scrolled');
 } else {
 navbar.classList.remove('scrolled');
 }
 }
 window.addEventListener('scroll', onScroll, { passive: true });
 onScroll();
})();

/* ---- Mobile menu ---- */
(function () {
 const openBtn = document.getElementById('hamburger');
 const closeBtn = document.getElementById('mobile-close');
 const menu = document.getElementById('mobile-menu');
 if (!menu) return;
 function openMenu() {
 menu.classList.add('open');
 document.body.style.overflow = 'hidden';
 }
 function closeMenu() {
 menu.classList.remove('open');
 document.body.style.overflow = '';
 }
 if (openBtn) openBtn.addEventListener('click', openMenu);
 if (closeBtn) closeBtn.addEventListener('click', closeMenu);
 menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
})();

/* ---- Scroll-triggered animations ---- */
(function () {
 const selectors = '.animate-on-scroll, .reveal-on-scroll';
 const els = document.querySelectorAll(selectors);
 if (!els.length) return;
 const io = new IntersectionObserver((entries) => {
 entries.forEach(e => {
 if (e.isIntersecting) {
 e.target.classList.add('visible');
 io.unobserve(e.target);
 }
 });
 }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
 els.forEach(el => io.observe(el));
})();

/* ---- Scroll indicator (hero) ---- */
(function () {
 const btn = document.getElementById('scroll-down');
 if (!btn) return;
 btn.addEventListener('click', () => {
 window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
 });
})();

/* ---- Testimonials carousel ---- */
(function () {
 const section = document.getElementById('testimonials');
 if (!section) return;
 const cards = section.querySelectorAll('.testimonial-slide');
 const dots = section.querySelectorAll('.dot');
 const prevBtn = document.getElementById('test-prev');
 const nextBtn = document.getElementById('test-next');
 if (!cards.length) return;
 let current = 0;
 function show(idx) {
 cards.forEach((c, i) => { c.style.display = i === idx ? 'block' : 'none'; });
 dots.forEach((d, i) => { d.classList.toggle('active', i === idx); });
 current = idx;
 }
 dots.forEach((d, i) => d.addEventListener('click', () => show(i)));
 if (prevBtn) prevBtn.addEventListener('click', () => show((current - 1 + cards.length) % cards.length));
 if (nextBtn) nextBtn.addEventListener('click', () => show((current + 1) % cards.length));
 show(0);
})();

/* ---- FAQ accordion (.faq-item / .faq-btn) ---- */
(function () {
 document.querySelectorAll('.faq-item').forEach(item => {
 const btn = item.querySelector('.faq-btn, .faq-question');
 if (!btn) return;
 btn.addEventListener('click', () => {
 const isOpen = item.classList.contains('open');
 document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
 if (!isOpen) item.classList.add('open');
 });
 });
})();

/* ---- Booking page FAQ accordion (.bfaq-item / .bfaq-btn) ---- */
(function () {
 document.querySelectorAll('.bfaq-item').forEach(item => {
 const btn = item.querySelector('.bfaq-btn');
 if (!btn) return;
 btn.addEventListener('click', () => {
 const isOpen = item.classList.contains('open');
 document.querySelectorAll('.bfaq-item.open').forEach(i => i.classList.remove('open'));
 if (!isOpen) item.classList.add('open');
 });
 });
})();

/* ---- Booking enquiry form (dark section) ---- */
(function () {
 const form = document.getElementById('booking-form');
 const success = document.getElementById('booking-success');
 if (!form || !success) return;
 form.addEventListener('submit', e => {
 e.preventDefault();
 form.style.display = 'none';
 success.style.display = 'block';
 });
})();

/* ---- Events tab selector ---- */
(function () {
 const tabs = document.querySelectorAll('.event-tab');
 const details = document.querySelectorAll('.event-detail');
 if (!tabs.length) return;
 function activate(id) {
 tabs.forEach(t => t.classList.toggle('active', t.dataset.event === id));
 details.forEach(d => d.classList.toggle('active', d.dataset.event === id));
 }
 tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.event)));
 if (tabs[0]) activate(tabs[0].dataset.event);
})();

/* ---- Gallery filter + lightbox ---- */
(function () {
 const filtersEl = document.querySelector('.gallery-filters');
 const masonryEl = document.querySelector('.gallery-masonry');
 const lightbox = document.getElementById('lightbox');
 if (!masonryEl) return;

 const allItems = Array.from(masonryEl.querySelectorAll('.gallery-item'));

 // Filter
 if (filtersEl) {
 filtersEl.querySelectorAll('.gallery-filter').forEach(btn => {
 btn.addEventListener('click', () => {
 filtersEl.querySelectorAll('.gallery-filter').forEach(b => b.classList.remove('active'));
 btn.classList.add('active');
 const cat = btn.dataset.cat;
 allItems.forEach(item => {
 const show = cat === 'All' || item.dataset.cat === cat;
 item.style.display = show ? '' : 'none';
 });
 });
 });
 }

 // Lightbox
 if (!lightbox) return;
 const lbImg = lightbox.querySelector('.lightbox-main-img');
 const lbCat = lightbox.querySelector('.lightbox-cat');
 const lbClose = lightbox.querySelector('.lightbox-close');
 const lbPrev = lightbox.querySelector('.lightbox-prev');
 const lbNext = lightbox.querySelector('.lightbox-next');
 let visible = [];
 let lbIdx = 0;

 function openLightbox(idx) {
 visible = allItems.filter(i => i.style.display !== 'none');
 lbIdx = idx;
 const item = visible[lbIdx];
 if (!item) return;
 lbImg.src = item.dataset.src;
 lbImg.alt = item.dataset.alt;
 if (lbCat) lbCat.textContent = item.dataset.cat;
 lightbox.classList.add('open');
 document.body.style.overflow = 'hidden';
 }
 function closeLightbox() {
 lightbox.classList.remove('open');
 document.body.style.overflow = '';
 }
 function showNext() { lbIdx = (lbIdx + 1) % visible.length; openLightbox(lbIdx); }
 function showPrev() { lbIdx = (lbIdx - 1 + visible.length) % visible.length; openLightbox(lbIdx); }

 allItems.forEach((item, i) => {
 item.addEventListener('click', () => openLightbox(i));
 });
 if (lbClose) lbClose.addEventListener('click', closeLightbox);
 lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
 if (lbPrev) lbPrev.addEventListener('click', e => { e.stopPropagation(); showPrev(); });
 if (lbNext) lbNext.addEventListener('click', e => { e.stopPropagation(); showNext(); });
 document.addEventListener('keydown', e => {
 if (!lightbox.classList.contains('open')) return;
 if (e.key === 'Escape') closeLightbox();
 if (e.key === 'ArrowLeft') showPrev();
 if (e.key === 'ArrowRight') showNext();
 });
})();

/* ---- Generic forms with inline .form-success ---- */
(function () {
 // Handles contact-form and any other forms with a .form-success sibling
 // (not booking-form which has its own handler above)
 document.querySelectorAll('form:not(#booking-form)').forEach(form => {
 if (!form.querySelector('.form-success')) return;
 form.addEventListener('submit', e => {
 e.preventDefault();
 const successEl = form.querySelector('.form-success');
 if (successEl) successEl.style.display = 'block';
 });
 });
})();
/* ---- Sticky room nav highlight ---- */
(function () {
 const roomNav = document.querySelector('.room-nav-inner');
 if (!roomNav) return;
 const links = roomNav.querySelectorAll('a');
 const sections = Array.from(links).map(a => document.querySelector(a.getAttribute('href')));
 function onScroll() {
 let active = 0;
 sections.forEach((s, i) => {
 if (s && s.getBoundingClientRect().top <= 120) active = i;
 });
 links.forEach((l, i) => {
 l.style.color = i === active ? 'var(--gold)' : '';
 l.style.borderBottomColor = i === active ? 'var(--gold)' : 'transparent';
 });
 }
 window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---- Copyright year ---- */
(function () {
 document.querySelectorAll('.current-year').forEach(el => {
 el.textContent = new Date().getFullYear();
 });
})();
