/* ═══════════════════════════════════════
   SAMUI EXPLORER — Global JavaScript
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Sticky nav shadow on scroll
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ── Mobile hamburger
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('nav-open');
  });

  // ── Active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath) link.classList.add('active');
  });

  // ── Lazy load images
  const imgs = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.src = e.target.dataset.src;
          io.unobserve(e.target);
        }
      });
    }, { rootMargin:'200px' });
    imgs.forEach(img => io.observe(img));
  }

  // ── Smooth fade-in on scroll
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const fadeIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          fadeIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => fadeIO.observe(el));
  }

});

// ── Fade-in CSS injection
const style = document.createElement('style');
style.textContent = `
  .fade-in { opacity:0; transform:translateY(20px); transition:opacity 0.6s ease, transform 0.6s ease; }
  .fade-in.visible { opacity:1; transform:translateY(0); }
  .nav-links.nav-open { display:flex !important; flex-direction:column; position:absolute; top:100%; left:0; right:0; background:rgba(250,247,242,0.98); padding:1rem 2rem 2rem; border-bottom:1px solid rgba(11,140,135,0.1); }
`;
document.head.appendChild(style);
