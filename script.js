/**
 * Rudar Sharma Portfolio - Multi-Page Interactions Engine
 * Coordinates scroll-triggered animations and mobile navbar drawer states.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. REVEAL ENGINE (Scroll-triggered Entrance Animation) ---
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

  // Automatically reveal hero sections immediately
  const homeSection = document.querySelector('#home');
  if (homeSection) {
    setTimeout(() => {
      homeSection.classList.add('revealed');
    }, 100);
  }

  const projectsSection = document.querySelector('#projects');
  if (projectsSection) {
    setTimeout(() => {
      projectsSection.classList.add('revealed');
    }, 100);
  }

  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    setTimeout(() => {
      skillsSection.classList.add('revealed');
    }, 100);
  }

  const milestonesSection = document.querySelector('#milestones');
  if (milestonesSection) {
    setTimeout(() => {
      milestonesSection.classList.add('revealed');
    }, 100);
  }

  const connectSection = document.querySelector('#connect');
  if (connectSection) {
    setTimeout(() => {
      connectSection.classList.add('revealed');
    }, 100);
  }


  // --- 2. RESPONSIVE MOBILE NAVIGATION DRAWER CONTROLLER ---
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
