/**
 * Rudar Sharma Portfolio - Multi-Page Screenshot-Precise Interactions Engine
 * Coordinates scroll-triggered entrance reveals and mobile navbar drawer states.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. REVEAL ENGINE (Entrance fade & slide-ups) ---
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Animate once
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // Viewport bounds
    threshold: 0.05, // Trigger when 5% is visible
    rootMargin: '0px 0px -20px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // Automatically reveal active route sections immediately on load
  const routeSelectors = ['#home', '#projects', '#skills', '#milestones', '#gallery', '#connect'];
  
  routeSelectors.forEach(selector => {
    const section = document.querySelector(selector);
    if (section) {
      setTimeout(() => {
        section.classList.add('revealed');
      }, 100);
    }
  });


  // --- 2. RESPONSIVE MOBILE NAVIGATION DRAWER ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
      
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        const isMenu = icon.getAttribute('data-lucide') === 'menu';
        icon.setAttribute('data-lucide', isMenu ? 'x' : 'menu');
        lucide.createIcons(); // Redraw Lucide icon
      }
    });

    // Close menu automatically on click
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          lucide.createIcons();
        }
      });
    });
  }

});
