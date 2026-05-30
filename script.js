/**
 * Rudar Sharma Portfolio - Editorial Visual Overhaul Logic
 * Handles reveal animations, responsive navigation drawer, and active nav states.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. REVEAL ENGINE (Scroll-triggered Fade and Slide-ups) ---
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // Default viewport
    threshold: 0.08, // Trigger when 8% is visible
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // Immediately reveal home section on initial load
  const homeSection = document.querySelector('#home');
  if (homeSection) {
    setTimeout(() => {
      homeSection.classList.add('revealed');
    }, 100);
  }


  // --- 2. RESPONSIVE MOBILE NAVIGATION HAMBURGER DRAWER ---
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

    // Automatically close drawer when a nav link is selected
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


  // --- 3. ACTIVE NAV LINK STATE MANAGER (Scrollspy) ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150; // Account for sticky menu padding
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-white', 'nav-link-active');
      link.classList.add('text-zinc-400');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('text-white', 'nav-link-active');
        link.classList.remove('text-zinc-400');
      }
    });
  });

});
