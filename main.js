/* ═══════════════════════════════════════════════════════════════
   TAMKEEN NOIR — main.js
   GSAP animations, Lenis smooth scroll, modal, nav logic
   ═══════════════════════════════════════════════════════════════ */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* ─── LENIS SMOOTH SCROLL ─── */
const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 1,
  infinite: false,
  gestureOrientation: 'vertical',
  normalizeWheel: true,
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync Lenis with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

/* ═══════════════════════════════════════════════════════════════
   1. HERO ANIMATIONS
   ═══════════════════════════════════════════════════════════════ */
const initHeroAnimations = () => {
  const video = document.querySelector('.bg-video');
  const heroDetails = document.querySelector('.hero-details');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCtaGroup = document.querySelector('.hero-cta-group');
  const heroTextBg = document.querySelector('.hero-text-bg');
  const nav = document.querySelector('.nav');

  if (!video) return;

  // Entrance Timeline
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  gsap.set(video, { scale: 1.2, opacity: 0 });
  gsap.set(heroTextBg, { scale: 0.5, opacity: 0 });
  gsap.set([heroTitle, heroSubtitle, heroCtaGroup], { y: 60, opacity: 0 });
  gsap.set(nav, { y: -100, opacity: 0 });

  tl.to(video, { scale: 1.05, opacity: 1, duration: 2.5, ease: 'power2.out' })
    .to(heroTextBg, { scale: 1, opacity: 1, duration: 2, ease: 'power4.out' }, '-=1.5')
    .to(heroTitle, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out' }, '-=1.2')
    .to(heroSubtitle, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.8')
    .to(heroCtaGroup, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.6')
    .to(nav, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, '-=0.8');


  // Scroll-driven parallax
  gsap.to(video, {
    scale: 1,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to(heroDetails, {
    y: -150,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to(heroTextBg, {
    y: -250,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
    },
  });
};

/* ═══════════════════════════════════════════════════════════════
   2. PRODUCT REVEAL ANIMATIONS (STABILIZED REBUILD)
   ═══════════════════════════════════════════════════════════════ */
const initProductRevealAnimations = () => {
  const section = document.querySelector('.product-reveal');
  const container = document.querySelector('.product-reveal-watch-container');
  const details = document.querySelector('.product-reveal-details');
  const textBg = document.querySelector('.product-reveal-text-bg');

  if (!section || !container) return;

  const mm = gsap.matchMedia();

  // Unified logic for all screen sizes (Mobile, Tablet, and Desktop)
  mm.add("(min-width: 0px)", () => {
    // 1. Initial State
    gsap.set(container, { 
      autoAlpha: 0, 
      scale: 0.8, 
      rotationZ: -15, 
      force3D: true,
      filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.7))'
    });
    
    gsap.set(details.children, { autoAlpha: 0, y: 30 });
    if (textBg) gsap.set(textBg, { autoAlpha: 0, y: 50 });

    // 2. Entrance Reveal
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        once: true
      }
    });

    entranceTl.to(container, { autoAlpha: 1, scale: 1, rotationZ: 0, duration: 1.2, ease: 'power3.out' })
      .to(details.children, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out' }, '-=0.8')
      .to(textBg, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8');

    // 3. Scrub Animation (Rotation + Scale + Vertical)
    gsap.to(container, {
      rotationZ: 25,
      scale: 1.35,
      y: 0, // Set to 0 to keep it centered when it stops
      force3D: true,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'center center',
        scrub: 1.5, // Smoothed for a more premium feel
      }
    });

    if (textBg) {
      gsap.to(textBg, {
        y: -100, // Reduced parallax for better alignment
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'center center',
          scrub: 1.2
        }
      });
    }
  });

  // Static mobile override removed to enable animation everywhere

};

/* ═══════════════════════════════════════════════════════════════
   3. ETHOS / COLLECTION (PURE GSAP REBUILD)
   ═══════════════════════════════════════════════════════════════ */
const initEthosAnimations = () => {
  const section = document.querySelector('.ethos');
  const variants = document.querySelectorAll('.ethos-main');
  const bgs = document.querySelectorAll('.ethos-bg-img');

  if (!section || variants.length === 0) return;

  // 1. Pre-render All to avoid "Big Photo" glitch
  gsap.set(variants, { autoAlpha: 0, x: 100, scale: 0.95, zIndex: 1 });
  gsap.set(bgs, { autoAlpha: 0, zIndex: 1 });

  // Set initial active state manually
  const initialIdx = 0;
  gsap.set(variants[initialIdx], { autoAlpha: 1, x: 0, scale: 1, zIndex: 10 });
  gsap.set(bgs[initialIdx], { autoAlpha: 0.6, zIndex: 5 });
  variants[initialIdx].classList.add('active'); // Still used for logic, not styling

  let isAnimating = false;
  const nextBtns = document.querySelectorAll('.ethos-next-btn');

  nextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isAnimating) return;

      const targetId = btn.dataset.target; // bl or rs
      const current = document.querySelector('.ethos-main.active');
      const next = document.querySelector(`.ethos-main.variant-${targetId}`);
      
      // Map targets to backgrounds
      const currentBg = section.querySelector(`.ethos-bg-img[class*="active"]`);
      const nextBg = section.querySelector(`.ethos-bg-${targetId}`);

      if (!current || !next || current === next) return;

      isAnimating = true;
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
          current.classList.remove('active');
          next.classList.add('active');
          if (currentBg) currentBg.classList.remove('active');
          if (nextBg) nextBg.classList.add('active');
        }
      });

      // CROSS-FADE SYSTEM
      // Move Current Out
      tl.to(current, { 
        autoAlpha: 0, 
        x: -60, 
        duration: 0.6, 
        ease: 'expo.inOut' 
      }, 0);
      
      if (currentBg) tl.to(currentBg, { autoAlpha: 0, duration: 0.6 }, 0);

      // Move Next In
      tl.fromTo(next, 
        { autoAlpha: 0, x: 60, scale: 0.98, zIndex: 20 },
        { 
          autoAlpha: 1, 
          x: 0, 
          scale: 1, 
          duration: 0.8, 
          ease: 'expo.out' // Snappier feel
        }, 
      0.3);

      if (nextBg) tl.to(nextBg, { autoAlpha: 0.6, duration: 0.8 }, 0.3);
    });
  });

  // BG Parallax
  bgs.forEach(img => {
    gsap.to(img, {
      yPercent: 15,
      scale: 1.1,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
};

/* ═══════════════════════════════════════════════════════════════
   4. DISMANTLE / CRAFTSMANSHIP VIDEO ANIMATION
   ═══════════════════════════════════════════════════════════════ */
const initDismantleAnimations = () => {
  const canvas = document.getElementById('dismantle-canvas');
  const section = document.querySelector('.dismantle');

  if (!canvas || !section) return;

  const context = canvas.getContext('2d');
  const frameCount = 190;
  const currentFrame = (index) => `/WatchFrames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

  const images = [];
  const frameObj = {
    frame: 0
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }

  gsap.to(frameObj, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: '.dismantle',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
    onUpdate: render
  });

  images[0].onload = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  };

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function render() {
    if (images[frameObj.frame] && images[frameObj.frame].complete) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images[frameObj.frame];
      
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  }
};

/* ═══════════════════════════════════════════════════════════════
   5. NAV SCROLL BEHAVIOR
   ═══════════════════════════════════════════════════════════════ */
const initNavScroll = () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScrollY = 0;
  const threshold = 50;

  lenis.on('scroll', ({ scroll }) => {
    if (scroll > lastScrollY && scroll > threshold) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScrollY = scroll;
  });
};

/* ═══════════════════════════════════════════════════════════════
   6. SMOOTH SCROLL ANCHORS
   ═══════════════════════════════════════════════════════════════ */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        lenis.scrollTo(targetEl, { offset: -72, duration: 1.2 });
      }
    });
  });
};

/* ═══════════════════════════════════════════════════════════════
   7. GENERAL SCROLL REVEALS
   ═══════════════════════════════════════════════════════════════ */
const initScrollReveals = () => {
  // Helper to create reveals for section contents
  const reveals = [
    { selector: '.heritage-text', trigger: '.heritage' },
    { selector: '.heritage-stats', trigger: '.heritage', delay: 0.3 },
    { selector: '.ethos-header', trigger: '.ethos' },
    { selector: '.dismantle-header', trigger: '.dismantle' },
    { selector: '.showcase-text', trigger: '.showcase' },
    { selector: '.footer-grid', trigger: '.footer' }
  ];

  reveals.forEach(({ selector, trigger, delay = 0 }) => {
    const el = document.querySelector(selector);
    const triggerEl = document.querySelector(trigger);
    
    if (!el || !triggerEl) return;

    // Set initial state
    const children = el.children;
    gsap.set(children, { y: 40, opacity: 0 });

    ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(children, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          delay: delay
        });
      },
      once: true
    });
  });
};


/* ═══════════════════════════════════════════════════════════════
   INIT ALL
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimations();
  initProductRevealAnimations();
  initEthosAnimations();
  initDismantleAnimations();
  initScrollReveals();
  initNavScroll();
  initSmoothScroll();
});
