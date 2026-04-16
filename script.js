/* script.js — Style 1: Dark Glassmorphism / Cyberpunk */

/* ===============================
   🔥 PAGE LOADER (ADDED)
   =============================== */

(function initLoader() {
  const loader = document.createElement('div');
  loader.className = 'page-loader';

  loader.innerHTML = `
    <div class="loader-name">
      <span>G</span><span>O</span><span>K</span><span>U</span><span>L</span>
      <span style="color:var(--cyan);margin:0 6px">&nbsp;</span>
      <span>J</span>
    </div>
    <div class="loader-bar-wrap">
      <div class="loader-bar-fill"></div>
    </div>
    <div class="loader-label">Initializing system...</div>
  `;

  document.body.prepend(loader);

  // Remove loader after animation
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 2200);
})();

// === CUSTOM CURSOR ===
const cursor = document.createElement('div');
cursor.id = 'cursor';
const trail = document.createElement('div');
trail.id = 'cursor-trail';
const label = document.createElement('div');
label.id = 'cursor-label';
document.body.append(cursor, trail, label);

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  label.style.left = mouseX + 'px';
  label.style.top = mouseY + 'px';
  setTimeout(() => {
    trail.style.left = mouseX + 'px';
    trail.style.top = mouseY + 'px';
  }, 80);
});

// Cursor labels per section
const cursorMessages = {
  'about': '[ INIT: HOME ]',
  'skills': '[ SKILLS.EXE ]',
  'experience': '[ WORK.LOG ]',
  'education': '[ EDU.DATA ]',
  'certs': '[ CERT.VERIFY ]',
  'contact': '[ CONNECT.CONT ]',
};

const sections = document.querySelectorAll('section[id]');
function getCurrentSection() {
  let current = '';
  sections.forEach(s => {
    const top = s.getBoundingClientRect().top;
    if (top <= window.innerHeight / 2) current = s.id;
  });
  return current;
}

document.addEventListener('mousemove', () => {
  const sec = getCurrentSection();
  const msg = cursorMessages[sec] || '[ NAVIGATE ]';
  label.textContent = msg;
  label.style.opacity = '1';
});
document.addEventListener('mouseleave', () => { label.style.opacity = '0'; });

document.querySelectorAll('a, button, .skill-card, .stat-box').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '32px';
    cursor.style.height = '32px';
    cursor.style.borderColor = '#ff00aa';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '16px';
    cursor.style.height = '16px';
    cursor.style.borderColor = '#00f5ff';
  });
});

/* ===============================
   🔥 H1 NAME EFFECT (Gokul J)
   =============================== */

(function initH1Effect() {
  const nameSpan = document.querySelector('h1 span');
  const h1 = document.querySelector('h1');

  if (!nameSpan) return;

  // Store text for reveal effect
  nameSpan.setAttribute('data-text', nameSpan.textContent);

  // Trigger reveal after loader ends
  setTimeout(() => {
    nameSpan.classList.add('reveal');
  }, 2300);

  // Random glitch effect every few seconds
  setInterval(() => {
    h1.classList.add('glitch');
    setTimeout(() => h1.classList.remove('glitch'), 200);
  }, 4000 + Math.random() * 2000);
})();

// === CANVAS GRID BACKGROUND ===
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(0, 245, 255, 0.04)';
  ctx.lineWidth = 1;
  const step = 60;
  for (let x = 0; x < canvas.width; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }
}
drawGrid();

// === FLOATING PARTICLES ===
const particles = [];
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -Math.random() * 0.6 - 0.1,
    size: Math.random() * 2 + 0.5,
    alpha: Math.random() * 0.6 + 0.2,
    color: Math.random() > 0.5 ? '#00f5ff' : '#ff00aa'
  });
}
function animParticles() {
  drawGrid();
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.y < 0) { p.y = window.innerHeight; p.x = Math.random() * window.innerWidth; }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba');
    // fallback: just use globalAlpha
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  requestAnimationFrame(animParticles);
}
animParticles();

// === 3D CARD TILT ===
const cardWrap = document.getElementById('tilt-card');
const card3d = document.getElementById('card3d');
if (cardWrap) {
  cardWrap.addEventListener('mousemove', e => {
    const rect = cardWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card3d.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 15}deg)`;
  });
  cardWrap.addEventListener('mouseleave', () => {
    card3d.style.transform = 'rotateY(0) rotateX(0)';
  });
}

// === SCROLL FADE IN ===
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

// === GLITCH TITLE EFFECT ===
const h1 = document.querySelector('h1');
if (h1) {
  setInterval(() => {
    h1.style.textShadow = `${(Math.random() - 0.5) * 8}px 0 #ff00aa, ${(Math.random() - 0.5) * 8}px 0 #00f5ff`;
    setTimeout(() => { h1.style.textShadow = ''; }, 80);
  }, 4000);
}

// === TYPING EFFECT FOR ROLE ===
const roleEl = document.querySelector('.role');
if (roleEl) {
  const text = roleEl.textContent;
  roleEl.textContent = '';
  let i = 0;
  setTimeout(() => {
    const timer = setInterval(() => {
      roleEl.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 50);
  }, 600);
}

/* ===============================
   🔥 FONT SWITCH (ADD HERE - END OF FILE)
   =============================== */

(function fontSwitcher() {
  const fonts = [
    "font-orbitron",
    "font-arial",
    "font-courier",
    "font-mono"
  ];

  let i = 0;

  setInterval(() => {
    document.body.classList.remove(...fonts);
    document.body.classList.add(fonts[i]);
    i = (i + 1) % fonts.length;
  }, 3000);
})();

/* ============================================================
   MOBILE NAV PATCH — Append this to the END of your script.js
   ============================================================ */

(function initMobileNav() {

  const nav       = document.querySelector('nav');
  const navLinks  = document.querySelector('.nav-links');
  if (!nav || !navLinks) return;

  /* ── 1. CREATE HAMBURGER BUTTON ── */
  const toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-label', 'Toggle navigation');
  toggle.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  nav.appendChild(toggle);

  /* ── 2. OPEN / CLOSE LOGIC ── */
  function openMenu() {
    toggle.classList.add('open');
    navLinks.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    toggle.classList.remove('open');
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function isOpen() { return navLinks.classList.contains('open'); }

  toggle.addEventListener('click', e => {
    e.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  /* ── 3. CLOSE ON NAV LINK CLICK ── */
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      closeMenu();
    });
  });

  /* ── 4. CLOSE ON OUTSIDE TAP ── */
  document.addEventListener('click', e => {
    if (isOpen() && !nav.contains(e.target)) closeMenu();
  });

  /* ── 5. CLOSE ON RESIZE BACK TO DESKTOP ── */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });

  /* ── 6. HIDE TOGGLE ON DESKTOP (CSS handles it,
           but keep aria tidy too) ── */
  const mq = window.matchMedia('(max-width: 768px)');
  function handleMQ(e) {
    if (!e.matches) closeMenu();
  }
  mq.addEventListener('change', handleMQ);

})();
