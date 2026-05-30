/**
 * Rudar Sharma Portfolio - Application Logic Core
 * Custom viewport reveals, dynamic terminal simulation, responsive navigation, and interactivity.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. REVEAL ENGINE (Fades & Slide-ins on Scroll) ---
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, we don't need to observe it anymore
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // Viewport
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: '0px 0px -50px 0px' // Adjust bounds
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // Reveal the first section (home) immediately to ensure fast initial page load experience
  const homeSection = document.querySelector('#home');
  if (homeSection) {
    setTimeout(() => {
      homeSection.classList.add('revealed');
    }, 100);
  }


  // --- 2. DYNAMIC TERMINAL SIMULATOR (Robotics Log Typewriter) ---
  const logElement = document.getElementById('log-text');
  const terminalLogs = [
    "Initializing neural core compute grids...",
    "Scanning feedback sensors & loop controllers...",
    "Compiling forward & inverse kinematics solvers...",
    "Connecting ROS2 local communication bridges...",
    "Executing computer vision model calibrations...",
    "Rudar Sharma verified // Class 10 STEM Elite.",
    "HOOLLOW core repositories successfully validated...",
    "Optimizing deep neural networks for edge computing...",
    "Loading embedded firmware logic profiles..."
  ];

  let logIndex = 0;
  let textIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50;

  function typeLog() {
    const currentLog = terminalLogs[logIndex];
    
    if (isDeleting) {
      // Deleting character
      logElement.textContent = currentLog.substring(0, textIndex - 1);
      textIndex--;
      typingSpeed = 20; // Delete faster
    } else {
      // Typing character
      logElement.textContent = currentLog.substring(0, textIndex + 1);
      textIndex++;
      typingSpeed = 50; // Normal typing speed
    }

    // Typewriter state control
    if (!isDeleting && textIndex === currentLog.length) {
      // Hold complete message for a few seconds
      typingSpeed = 2500;
      isDeleting = true;
    } else if (isDeleting && textIndex === 0) {
      isDeleting = false;
      // Cycle to the next log message
      logIndex = (logIndex + 1) % terminalLogs.length;
      typingSpeed = 500; // Delay before starting next word
    }

    setTimeout(typeLog, typingSpeed);
  }

  // Initiate dynamic terminal typewriter loop
  if (logElement) {
    setTimeout(typeLog, 1000);
  }


  // --- 3. MOBILE MENU hamburger DRAWER ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
      // Alternate hamburger and close icons if lucide allows
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        const isMenu = icon.getAttribute('data-lucide') === 'menu';
        icon.setAttribute('data-lucide', isMenu ? 'x' : 'menu');
        lucide.createIcons(); // Re-render icons
      }
    });

    // Close mobile menu drawer when navigation links are clicked
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


  // --- 4. NAVIGATION STATE HIGHLIGHT (Scrollspy) ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // Offset for sticky header
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


  // --- 5. MAGNETIC BUTTON MICRO-INTERACTION (Subtle Cursor Pull) ---
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull element toward user cursor gently (max 8px translation)
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      // Snap back smoothly
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

});
