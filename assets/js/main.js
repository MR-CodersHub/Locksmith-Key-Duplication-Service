/**
 * KEYORA LOCKSMITH & SECURITY SOLUTIONS
 * Master Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initStickyHeader();
  initMobileNavigation();
  initServicesFilter();
  initTestimonialsCarousel();
  initFaqAccordion();
  initFaqSearch();
  initModals();
  initCostCalculator();
  initContactForms();
  initLucideIcons();
});

/* ==========================================================================
   1. THEME SWITCHER (Light / Dark Mode with Persistence)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('keyora-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const target = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', target);
      localStorage.setItem('keyora-theme', target);
      updateThemeIcons(target);
    });
  });
}

function updateThemeIcons(theme) {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  themeToggles.forEach(btn => {
    btn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`);
    btn.setAttribute('title', `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`);
    // Sun icon for dark mode (to switch back to light), Moon icon for light mode
    if (theme === 'dark') {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    } else {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    }
  });
}

/* ==========================================================================
   2. LTR / RTL DIRECTION SWITCHER
   ========================================================================== */
function initDirection() {
  const savedDir = localStorage.getItem('keyora-dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
  updateDirButtons(savedDir);

  const dirToggles = document.querySelectorAll('.dir-toggle-btn');
  dirToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const target = current === 'ltr' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', target);
      localStorage.setItem('keyora-dir', target);
      updateDirButtons(target);
    });
  });
}

function updateDirButtons(dir) {
  const dirToggles = document.querySelectorAll('.dir-toggle-btn');
  dirToggles.forEach(btn => {
    btn.setAttribute('aria-label', `Switch to ${dir === 'ltr' ? 'RTL' : 'LTR'} layout`);
    btn.setAttribute('title', `Switch to ${dir === 'ltr' ? 'RTL' : 'LTR'} layout`);
    btn.innerHTML = `<span style="font-weight: 700; font-size: 0.75rem; letter-spacing: 0.05em;">${dir === 'ltr' ? 'RTL' : 'LTR'}</span>`;
  });
}

/* ==========================================================================
   3. STICKY HEADER BEHAVIOR
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   4. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const hamburgerBtns = document.querySelectorAll('.hamburger-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const navLinks = document.querySelectorAll('.mobile-nav-link');
  const subTriggers = document.querySelectorAll('.mobile-submenu-trigger');

  if (!hamburgerBtns.length || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('drawer-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';
  };

  hamburgerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDrawer();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }

  overlay.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    // Prevent backdrop close when clicking inside drawer content
    e.stopPropagation();
  });

  navLinks.forEach(link => {
    if (!link.classList.contains('mobile-submenu-trigger')) {
      link.addEventListener('click', closeDrawer);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Mobile submenu accordion
  subTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = trigger.closest('.mobile-nav-item');
      const submenu = parent ? parent.querySelector('.mobile-submenu') : null;
      if (submenu) {
        submenu.classList.toggle('open');
      }
    });
  });
}

/* ==========================================================================
   5. SERVICES FILTER TABS
   ========================================================================== */
function initServicesFilter() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter') || 'all';

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. TESTIMONIALS CAROUSEL
   ========================================================================== */
function initTestimonialsCarousel() {
  const track = document.querySelector('.testimonials-track');
  const slides = document.querySelectorAll('.testimonial-card-slide');
  const prevBtn = document.querySelector('.slider-prev-btn');
  const nextBtn = document.querySelector('.slider-next-btn');
  const dotsContainer = document.querySelector('.slider-dots-container');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const isMobile = () => window.innerWidth < 860;
  const totalSlides = slides.length;
  const getVisibleSlides = () => (isMobile() ? 1 : 2);
  const getMaxIndex = () => Math.max(0, totalSlides - getVisibleSlides());

  // Generate dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    const totalPages = totalSlides - getVisibleSlides() + 1;
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const slideWidth = slides[0].offsetWidth;
    const gap = 32; // 2rem
    const moveAmount = (slideWidth + gap) * currentIndex;
    const directionSign = isRtl ? 1 : -1;

    track.style.transform = `translateX(${directionSign * moveAmount}px)`;

    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
      updateSlider();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = currentIndex <= 0 ? getMaxIndex() : currentIndex - 1;
      updateSlider();
    });
  }

  window.addEventListener('resize', () => {
    if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
    updateSlider();
  });

  // Autoplay
  let autoplayTimer = setInterval(() => {
    currentIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
    updateSlider();
  }, 6500);

  track.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  track.addEventListener('mouseleave', () => {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      currentIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
      updateSlider();
    }, 6500);
  });
}

/* ==========================================================================
   7. FAQ ACCORDION & SEARCH FILTER
   ========================================================================== */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      accordionItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherContent = other.querySelector('.accordion-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Open first item by default if exists
  if (accordionItems.length > 0) {
    const firstItem = accordionItems[0];
    firstItem.classList.add('active');
    const firstContent = firstItem.querySelector('.accordion-content');
    if (firstContent) {
      firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    }
  }

  // Also initialize .faq-item on individual service detail pages
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-question-btn');
    const content = item.querySelector('.faq-answer-panel');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherContent = other.querySelector('.faq-answer-panel');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  if (faqItems.length > 0) {
    const firstFaq = faqItems[0];
    firstFaq.classList.add('active');
    const firstFaqContent = firstFaq.querySelector('.faq-answer-panel');
    if (firstFaqContent) {
      firstFaqContent.style.maxHeight = firstFaqContent.scrollHeight + 'px';
    }
  }
}

function initFaqSearch() {
  const searchInput = document.getElementById('faqSearchInput');
  const items = document.querySelectorAll('.accordion-item');

  if (!searchInput || !items.length) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    items.forEach(item => {
      const question = item.querySelector('.accordion-trigger')?.textContent.toLowerCase() || '';
      const answer = item.querySelector('.accordion-body-inner')?.textContent.toLowerCase() || '';

      if (question.includes(query) || answer.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   8. MODAL DIALOGS (Booking & Emergency Dispatch)
   ========================================================================== */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const closeTriggers = document.querySelectorAll('.modal-close-trigger, .modal-backdrop');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target === btn || btn.classList.contains('modal-close-trigger')) {
        const activeModal = btn.closest('.modal-backdrop') || btn;
        if (activeModal.classList.contains('modal-backdrop')) {
          activeModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModals = document.querySelectorAll('.modal-backdrop.active');
      activeModals.forEach(m => m.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   9. INTERACTIVE LOCK & KEY ESTIMATOR CALCULATOR
   ========================================================================== */
function initCostCalculator() {
  const serviceType = document.getElementById('calcServiceType');
  const keyCount = document.getElementById('calcKeyCount');
  const securityLevel = document.getElementById('calcSecurityLevel');
  const resultDisplay = document.getElementById('calcResultTotal');

  if (!serviceType || !resultDisplay) return;

  function calculate() {
    let base = 65; // standard callout
    const serviceVal = serviceType.value;
    const countVal = parseInt(keyCount ? keyCount.value : 1, 10) || 1;
    const secVal = securityLevel ? securityLevel.value : 'standard';

    if (serviceVal === 'lockout') base = 75;
    else if (serviceVal === 'rekey') base = 45 + (countVal * 15);
    else if (serviceVal === 'smartlock') base = 120;
    else if (serviceVal === 'car_key') base = 110;
    else if (serviceVal === 'key_duplication') base = 25 + (countVal * 7);

    if (secVal === 'high_security') base += 40;
    if (secVal === 'smart_access') base += 75;

    resultDisplay.textContent = `$${base}`;
  }

  [serviceType, keyCount, securityLevel].forEach(el => {
    if (el) el.addEventListener('change', calculate);
  });
}

/* ==========================================================================
   10. CONTACT & BOOKING FORM HANDLERS
   ========================================================================== */
function initContactForms() {
  const forms = document.querySelectorAll('form[data-ajax-form]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Processing Request...</span>`;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>✓ Request Confirmed!</span>`;
        }
        alert('Thank you! Your locksmith service request has been received. A Keyora certified technician will contact you within 5 minutes.');
        form.reset();

        const parentModal = form.closest('.modal-backdrop');
        if (parentModal) {
          parentModal.classList.remove('active');
          document.body.style.overflow = '';
        }

        setTimeout(() => {
          if (submitBtn) submitBtn.innerHTML = originalText;
        }, 3000);
      }, 900);
    });
  });
}

/* ==========================================================================
   11. LUCIDE ICONS SAFE INITIALIZER
   ========================================================================== */
function initLucideIcons() {
  if (typeof window.lucide !== 'undefined' && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
}


/* ==========================================================================
   GALLERY FILTER (HOME 2)
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card-item');

  if (!filterBtns.length || !galleryCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter') || 'all';

      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || cat.includes(filterVal)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilter();
});


/* ==========================================================================
   SERVICE DETAIL MODAL HANDLER (SERVICES CATALOGUE)
   ========================================================================== */
const serviceCatalogData = {
  residential: {
    title: "Residential Locksmith & Security",
    tagline: "Home Protection & Family Peace of Mind",
    image: "assets/images/sol-residential.jpg",
    desc: "Comprehensive residential security services ranging from precision lock repairs and deadbolt upgrades to whole-home rekeying. We evaluate exterior entry doors, sliding patio doors, and garage access points to ensure tamper-resistant defense.",
    features: [
      "ANSI Grade 1 and Grade 2 heavy-duty deadbolt installation",
      "Whole-house lock rekeying with unified master keys",
      "Smart biometric and digital keypad deadbolt integration",
      "Antique mortise lock restoration and hand-cut skeleton keys",
      "Door strike reinforcement and jam-free alignment adjustments"
    ],
    brands: "Schlage, Baldwin, Yale, Medeco, Kwikset",
    turnaround: "Same-Day Service / 30–60 Min on-site"
  },
  commercial: {
    title: "Commercial Master Key & Access Systems",
    tagline: "Enterprise Security Architecture",
    image: "assets/images/sol-commercial.jpg",
    desc: "Granular access management engineered for commercial office buildings, retail storefronts, healthcare facilities, and multi-tenant complexes. We establish master key hierarchies that give management effortless oversight while restricting sensitive zones.",
    features: [
      "Hierarchical Grand Master and Sub-Master key systems",
      "Small Format Interchangeable Core (SFIC) cylinder upgrades",
      "Commercial panic bar and crash exit hardware compliance",
      "Electric strikes, magnetic door locks, and keycard readers",
      "ADA compliance audits and emergency fire egress inspections"
    ],
    brands: "Mul-T-Lock, Medeco X4, Corbin Russwin, Sargent, ASSA ABLOY",
    turnaround: "Scheduled Project & Phased Rollout Available"
  },
  automotive: {
    title: "Automotive Locksmith & Smart Keys",
    tagline: "On-Site Roadside & Driveway Service",
    image: "assets/images/sol-automotive.jpg",
    desc: "Mobile automotive key solutions delivered directly to your vehicle's location. Avoid exorbitant dealership towing costs and multi-day waiting periods with our computerized on-site laser cutting and transponder chip synchronization.",
    features: [
      "High-security laser-cut sidewinder emergency keys",
      "Push-to-start smart proximity key fob replacement and programming",
      "OBD-II diagnostic chip pairing with vehicle immobilizer",
      "Ignition lock cylinder repair and stuck key extraction",
      "Trunk and glove compartment lock cylinder rebuilding"
    ],
    brands: "Toyota, Honda, Ford, BMW, Mercedes, Audi, Lexus, Hyundai, Nissan",
    turnaround: "15–30 Min Arrival / 20–40 Min On-Site Programming"
  },
  duplication: {
    title: "Precision Laser Key Duplication",
    tagline: "Micrometer-Calibrated Tolerance",
    image: "assets/images/sol-key-duplication.jpg",
    desc: "Generic hardware store cutters frequently introduce millimeter errors that cause locks to bind and degrade over time. Keyora utilizes optical laser bitting decoders to duplicate original factory specifications within 0.001mm tolerance.",
    features: [
      "Laser milling for high-security internal and external wave keys",
      "Restricted keyway duplication with security card authorization",
      "Tubular key cutting for vending, safes, and motorcycle locks",
      "Antique bit and barrel skeleton key hand-cutting",
      "Broken key reconstruction and decoding from worn fragments"
    ],
    brands: "Medeco, Mul-T-Lock, Best, Abloy, Sargent, Kaba",
    turnaround: "In-Store: 5–10 Min / Mobile Batch: On-Site"
  },
  installation: {
    title: "Lock Installation & Replacement",
    tagline: "Bespoke Door Hardware Upgrades",
    image: "assets/images/home2-hero-door.jpg",
    desc: "Whether upgrading weathered builders-grade locks or outfitting a newly constructed luxury estate, we drill, mortise, and fit architectural locks that harmonize visual beauty with unyielding physical strength.",
    features: [
      "Fresh door prep, precise mortise pocketing, and beveling",
      "Multi-point locking mechanism installation on modern entry doors",
      "Solid forged brass architectural handlesets and lever trims",
      "Anti-drill hardened steel strike plates with 3-inch anchor screws",
      "High-security mailbox, cabinet, and French door locksets"
    ],
    brands: "Rocky Mountain, Baldwin Estate, Emtek, Schlage Custom, Omnia",
    turnaround: "1–2 Hours Per Door / Comprehensive Warranty"
  },
  emergency: {
    title: "24/7 Emergency Lockout Assistance",
    tagline: "Non-Destructive Rapid Response",
    image: "assets/images/hero-art.png",
    desc: "Locked out in the dead of night, in severe weather, or during a holiday? Keyora's emergency mobile workshop units are permanently on active patrol to guarantee 15 to 30 minute arrival across all metropolitan neighborhoods.",
    features: [
      "100% Non-destructive lock manipulation and picking guarantee",
      "Immediate door access without harming trim, paint, or frame",
      "Emergency key generation on-site if original keys are lost inside",
      "Immediate post-break-in lock repair and cylinder securing",
      "Transparent upfront fixed pricing with zero dispatch extortion"
    ],
    brands: "All Residential, Commercial, and Automotive Cylinders",
    turnaround: "Guaranteed 15–30 Min Response / 24/7/365 Hotline"
  }
};

function initServiceModals() {
  const triggers = document.querySelectorAll('[data-service-detail]');
  const modal = document.getElementById('serviceDetailModal');
  if (!modal) return;

  const titleEl = document.getElementById('sdmTitle');
  const tagEl = document.getElementById('sdmTagline');
  const imgEl = document.getElementById('sdmImage');
  const descEl = document.getElementById('sdmDesc');
  const featsEl = document.getElementById('sdmFeatures');
  const brandsEl = document.getElementById('sdmBrands');
  const turnEl = document.getElementById('sdmTurnaround');
  const bookBtn = document.getElementById('sdmBookBtn');

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-service-detail');
      const data = serviceCatalogData[key];
      if (!data) return;

      if (titleEl) titleEl.textContent = data.title;
      if (tagEl) tagEl.textContent = data.tagline;
      if (imgEl) {
        imgEl.src = data.image;
        imgEl.alt = data.title;
      }
      if (descEl) descEl.textContent = data.desc;
      if (brandsEl) brandsEl.textContent = data.brands;
      if (turnEl) turnEl.textContent = data.turnaround;

      if (featsEl) {
        featsEl.innerHTML = '';
        data.features.forEach(f => {
          const li = document.createElement('li');
          li.style.cssText = "display: flex; align-items: flex-start; gap: 0.65rem; margin-bottom: 0.5rem; font-size: 0.9375rem;";
          li.innerHTML = `<svg style="width: 16px; height: 16px; stroke: #A47753; flex-shrink: 0; margin-top: 0.2rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>${f}</span>`;
          featsEl.appendChild(li);
        });
      }

      if (bookBtn) {
        bookBtn.onclick = () => {
          modal.classList.remove('active');
          const bookingModal = document.getElementById('bookingModal');
          if (bookingModal) {
            bookingModal.classList.add('active');
            const selectField = bookingModal.querySelector('select');
            if (selectField) {
              for (let i = 0; i < selectField.options.length; i++) {
                if (selectField.options[i].value.includes(key)) {
                  selectField.selectedIndex = i;
                  break;
                }
              }
            }
          }
        };
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initServiceModals();
});
