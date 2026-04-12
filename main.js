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
   2. PRODUCT REVEAL ANIMATIONS
   ═══════════════════════════════════════════════════════════════ */
const initProductRevealAnimations = () => {
  const watch = document.querySelector('.product-reveal-watch');
  const title = document.querySelector('.product-reveal-title');
  const subtitle = document.querySelector('.product-reveal-subtitle');
  const ctaGroup = document.querySelector('.product-reveal-cta-group');
  const textBg = document.querySelector('.product-reveal-text-bg');
  const details = document.querySelector('.product-reveal-details');

  if (!watch) return;

  // Entrance animations
  gsap.from(watch, {
    y: 50, opacity: 0, rotation: -5, duration: 1.5, ease: 'power4.out',
    scrollTrigger: {
      trigger: '.product-reveal',
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from(title, {
    y: 40, opacity: 0, duration: 1.2, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.product-reveal',
      start: 'top 55%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from(subtitle, {
    y: 30, opacity: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.product-reveal',
      start: 'top 50%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from(ctaGroup, {
    y: 30, opacity: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.product-reveal',
      start: 'top 45%',
      toggleActions: 'play none none reverse',
    },
  });

  // Scroll-driven rotation & zoom
  gsap.to(watch, {
    rotation: 20, scale: 1.3,
    scrollTrigger: {
      trigger: '.product-reveal',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });

  gsap.to(details, {
    y: -150,
    scrollTrigger: {
      trigger: '.product-reveal',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  if (textBg) {
    gsap.to(textBg, {
      y: -250,
      scrollTrigger: {
        trigger: '.product-reveal',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }
};

/* ═══════════════════════════════════════════════════════════════
   3. ETHOS / COLLECTION ANIMATIONS
   ═══════════════════════════════════════════════════════════════ */
const initEthosAnimations = () => {
  const bgImages = document.querySelectorAll('.ethos-bg-img');
  const section = document.querySelector('.ethos');

  if (!section) return;

  // BG parallax
  bgImages.forEach((img) => {
    gsap.to(img, {
      scale: 1.1, yPercent: 10,
      scrollTrigger: {
        trigger: '.ethos',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Variant switcher
  const nextBtns = document.querySelectorAll('.ethos-next-btn');
  nextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const currentActive = document.querySelector('.ethos-main.active');
      const currentBg = document.querySelector('.ethos-bg-img.active');
      const nextVariant = document.querySelector(`.ethos-main.variant-${target}`);
      const nextBg = document.querySelector(`.ethos-bg-${target}`);

      if (!currentActive || !nextVariant || currentActive === nextVariant) return;

      const currentText = currentActive.querySelector('.ethos-text-side');
      const currentWatch = currentActive.querySelector('.ethos-watch-img');
      const nextText = nextVariant.querySelector('.ethos-text-side');
      const nextWatch = nextVariant.querySelector('.ethos-watch-img');

      const switchTl = gsap.timeline({
        onComplete: () => {
          gsap.set([nextText, nextWatch], { clearProps: 'all' });
        },
      });

      // Animate out
      switchTl.to(currentText, { x: -100, opacity: 0, duration: 0.5, ease: 'power2.in' }, 0);
      switchTl.to(currentWatch, { x: -150, opacity: 0, duration: 0.5, ease: 'power2.in' }, 0);

      // Swap active
      switchTl.call(() => {
        currentActive.classList.remove('active');
        nextVariant.classList.add('active');
        if (currentBg) currentBg.classList.remove('active');
        if (nextBg) nextBg.classList.add('active');
        gsap.set(currentText, { clearProps: 'all' });
        gsap.set(currentWatch, { clearProps: 'all' });
        gsap.set(nextText, { x: 100, opacity: 0 });
        gsap.set(nextWatch, { x: 150, opacity: 0 });
      }, null, null, 0.55);

      // Animate in
      switchTl.to(nextText, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.6);
      switchTl.to(nextWatch, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.65);
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
   6. MODAL + SMOOTH SCROLL ANCHORS
   ═══════════════════════════════════════════════════════════════ */
const initModal = () => {
  const modal = document.getElementById('reserve-modal');
  const closeBtn = document.getElementById('modal-close');
  const openBtns = document.querySelectorAll('.open-reserve-modal');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtns.forEach((btn) => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Smooth scroll anchors
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
   INIT ALL
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimations();
  initProductRevealAnimations();
  initEthosAnimations();
  initDismantleAnimations();
  initNavScroll();
  initModal();
});
