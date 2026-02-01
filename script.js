// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initCustomCursor();
  initMobileMenu();
  initHeroAnimation();
  initMagneticBlur();
  initSkillsAnimation();
  initBentoTilt();
  initProjectsAnimation();
  initContactAnimation();
  initContactForm();
  initLiquidScroll();
  initSmoothScroll();
  initFooterFlip();
  initReadMore();
});

/* --------------------------------------------------------------------------
   PROJECTS ANIMATION - Expansion Hit
   -------------------------------------------------------------------------- */
function initProjectsAnimation() {
  const projectsSection = document.getElementById("projects");
  const projectsGrid = projectsSection?.querySelector(".projects-grid");
  const projectCards = projectsSection?.querySelectorAll(".project-card");

  if (!projectsSection || !projectsGrid || projectCards.length === 0) return;

  const observerOptions = {
    threshold: 0.1, // Trigger earlier for mobile visibility
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // --- ENTERING SECTION ---
        projectsGrid.classList.remove("leaving");
        projectsGrid.classList.add("visible");

        projectCards.forEach((card) => {
          card.classList.remove("animate-out");
          card.classList.add("animate-in");
        });
      } else {
        // --- LEAVING SECTION ---
        if (projectsGrid.classList.contains("visible")) {
          projectsGrid.classList.add("leaving");
          projectsGrid.classList.remove("visible");

          projectCards.forEach((card) => {
            card.classList.remove("animate-in");
            card.classList.add("animate-out");
          });
        }
      }
    });
  }, observerOptions);

  observer.observe(projectsSection);
}

/* --------------------------------------------------------------------------
   READ MORE FUNCTIONALITY
   -------------------------------------------------------------------------- */
function initReadMore() {
  const readMoreBtns = document.querySelectorAll(".read-more-btn");

  readMoreBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Prevent any parent click handlers 
      e.stopPropagation();

      const cardInfo = btn.closest(".project-info");
      const desc = cardInfo.querySelector(".project-desc");

      if (desc.classList.contains("expanded")) {
        // Collapse
        desc.classList.remove("expanded");
        btn.textContent = "Read More";
      } else {
        // Expand
        desc.classList.add("expanded");
        btn.textContent = "Read Less";
      }
    });
  });
}

/* --------------------------------------------------------------------------
   CONTACT ANIMATION 
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  html.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

/* --------------------------------------------------------------------------
   CUSTOM CURSOR - Dual Element (Dot follows instantly, Ring trails)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  if (!cursorDot || !cursorRing) return;

  // Track cursor position
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  // Update mouse position on move
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Ring follows with smooth delay using requestAnimationFrame
  function animateRing() {
    // Ease factor - lower = slower/smoother trailing
    const ease = 0.15;

    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on clickable elements
  const clickableSelectors =
    "a, button, input, textarea, [data-tilt], .btn, .social-link, .nav-logo, .skill-tag";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(clickableSelectors)) {
      document.body.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(clickableSelectors)) {
      document.body.classList.remove("cursor-hover");
    }
  });

  // Hide cursor when leaving window
  document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorRing.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursorDot.style.opacity = "1";
    cursorRing.style.opacity = "0.6";
  });
}

/* --------------------------------------------------------------------------
   MOBILE MENU - Toggle navigation on mobile devices
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  // Close menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });
}

/* --------------------------------------------------------------------------
   HERO ANIMATION - The Brick Throw
   -------------------------------------------------------------------------- */
function initHeroAnimation() {
  const heroContainer = document.getElementById("heroContainer");
  const heroSection = document.getElementById("home");

  if (!heroContainer || !heroSection) return;

  const observerOptions = {
    threshold: 0.1,
  };

  let animationTimeout1, animationTimeout2;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // RESET states first to allow re-animation
        heroContainer.classList.remove("animate-throw", "expanded", "revealed");

        // Force reflow
        void heroContainer.offsetWidth;

        // 1. STAGE 1 & 2: THE THROW & THE IMPACT
        heroContainer.classList.add("animate-throw");

        // 2. STAGE 3: THE EXPANSION
        animationTimeout1 = setTimeout(() => {
          heroContainer.classList.add("expanded");

          // 3. STAGE 4: THE REVEAL
          animationTimeout2 = setTimeout(() => {
            heroContainer.classList.add("revealed");
          }, 800);
        }, 1200);
      } else {
        // Clear timeouts and reset classes if scrolled out
        clearTimeout(animationTimeout1);
        clearTimeout(animationTimeout2);
        heroContainer.classList.remove("animate-throw", "expanded", "revealed");
      }
    });
  }, observerOptions);

  observer.observe(heroSection);
}

/* --------------------------------------------------------------------------
   MAGNETIC BLUR - About Section
   -------------------------------------------------------------------------- */
function initMagneticBlur() {
  const magneticElements = document.querySelectorAll('[data-animate="blur"]');

  if (magneticElements.length === 0) return;

  const observerOptions = {
    threshold: 0.15, // Trigger when 15% visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add visible class with staggered delay
        entry.target.classList.add("visible");
      } else {
        // Remove to allow repeat
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  // Observe each magnetic element
  magneticElements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   SKILLS ANIMATION - The Distribution Animation
   -------------------------------------------------------------------------- */
function initSkillsAnimation() {
  const skillsSection = document.getElementById("skills");
  const bentoGrid = skillsSection?.querySelector(".bento-grid");

  if (!skillsSection || !bentoGrid) return;

  const observerOptions = {
    threshold: 0.2,
  };

  let distributionTimeout;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 1. STACK PHASE: Ensure they are stacked first
        bentoGrid.classList.remove("is-distributed");

        // 2. DISTRIBUTION PHASE
        distributionTimeout = setTimeout(() => {
          bentoGrid.classList.add("is-distributed");
        }, 1000);
      } else {
        // Clear timeout and reset to stack when scrolled out
        clearTimeout(distributionTimeout);
        bentoGrid.classList.remove("is-distributed");
      }
    });
  }, observerOptions);

  observer.observe(skillsSection);
}

/* --------------------------------------------------------------------------
   3D BENTO TILT - Skills Section
   -------------------------------------------------------------------------- */
function initBentoTilt() {
  const tiltCards = document.querySelectorAll("[data-tilt]");

  if (tiltCards.length === 0) return;

  // Add event listeners to each card individually
  tiltCards.forEach((card) => {
    // Mouse move - apply 3D tilt
    card.addEventListener("mousemove", (e) => {
      // For bento cards, only tilt if they are already distributed
      const isBento = card.classList.contains("bento-card");
      if (isBento && !card.parentElement.classList.contains("is-distributed"))
        return;

      const rect = card.getBoundingClientRect();

      // Calculate mouse position relative to card
      const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

      // Calculate rotation
      const rotateY = relativeX * 15;
      const rotateX = relativeY * -15; // Invert for natural feel

      // Apply transform with perspective
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

      // Update glow position
      const glow = card.querySelector(".card-glow");
      if (glow) {
        glow.style.setProperty("--mouse-x", `${(relativeX + 0.5) * 100}%`);
        glow.style.setProperty("--mouse-y", `${(relativeY + 0.5) * 100}%`);
      }
    });

    // Mouse leave - reset to original state
    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });
}

/* --------------------------------------------------------------------------
   CONTACT ANIMATION - 
   -------------------------------------------------------------------------- */
function initContactAnimation() {
  const contactSection = document.getElementById("contact");

  if (!contactSection) return;

  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  }, observerOptions);

  observer.observe(contactSection);
}
/* --------------------------------------------------------------------------
   CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector(".btn-submit");
      const submitBtnText = submitBtn.querySelector("span");
      const originalText = submitBtnText.textContent;
      const originalBg = submitBtn.style.background;

      // 1. Loading State
      submitBtn.disabled = true;
      submitBtnText.textContent = "Sending...";
      submitBtn.style.opacity = "0.7";

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          // 2. Success State
          submitBtnText.textContent = "Message Sent!";
          submitBtn.style.background = "#4CAF50";
          submitBtn.style.opacity = "1";
          contactForm.reset();

          setTimeout(() => {
            submitBtnText.textContent = originalText;
            submitBtn.style.background = originalBg;
            submitBtn.disabled = false;
          }, 3000);
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        // 3. Error State
        console.error("Submission Error:", error);
        submitBtnText.textContent = "Error! Try again.";
        submitBtn.style.background = "#f44336";
        submitBtn.style.opacity = "1";

        setTimeout(() => {
          submitBtnText.textContent = originalText;
          submitBtn.style.background = originalBg;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   LIQUID SCROLL - Footer
   -------------------------------------------------------------------------- */
function initLiquidScroll() {
  const liquidBg = document.getElementById("liquidBg");
  const footer = document.getElementById("footer");

  if (!liquidBg || !footer) return;

  function updateLiquidFill() {
    // Calculate scroll progress (0-100%)
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / scrollHeight) * 100;

    // Update CSS variable for clip-path
    liquidBg.style.setProperty("--scroll-progress", `${scrollProgress}%`);
  }

  // Use passive listener for better scroll performance
  window.addEventListener("scroll", updateLiquidFill, { passive: true });

  // Initial update
  updateLiquidFill();
}

/* --------------------------------------------------------------------------
   SMOOTH SCROLL 
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      // Skip if it's just "#"
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        // Calculate offset for fixed navbar
        const navbarHeight = 80;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   FOOTER FLIP - Scroll-Reactive Animation
   -------------------------------------------------------------------------- */
function initFooterFlip() {
  const footerFlipCard = document.getElementById("footerFlipCard");
  const footer = document.getElementById("footer");

  if (!footerFlipCard || !footer) return;

  let lastScrollY = window.scrollY;

  // Use Intersection Observer for performance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", handleScrollFlip, {
            passive: true,
          });
        } else {
          window.removeEventListener("scroll", handleScrollFlip);
          // Reset to front when scrolling away
          footerFlipCard.classList.remove("flipped");
        }
      });
    },
    { threshold: 0.1 },
  );

  function handleScrollFlip() {
    const isScrollingDown = window.scrollY > lastScrollY;

    // Trigger flip based on scroll direction
    if (isScrollingDown) {
      footerFlipCard.classList.add("flipped");
    } else {
      footerFlipCard.classList.remove("flipped");
    }

    lastScrollY = window.scrollY;
  }

  observer.observe(footer);
}
