// ===== Terminal typing effect =====
const typedCmdEl = document.getElementById('typedCmd');
const cmdOutputEl = document.getElementById('cmdOutput');
const cmdCursorEl = document.getElementById('cmdCursor');
const command = 'I Am';

function typeCommand(i = 0) {
  if (i <= command.length) {
    typedCmdEl.textContent = command.slice(0, i);
    setTimeout(() => typeCommand(i + 1), 90);
  } else {
    setTimeout(() => {
      cmdCursorEl.style.display = 'none';
      cmdOutputEl.hidden = false;
      cmdOutputEl.style.animation = 'fadeUp 0.6s ease forwards';
    }, 350);
  }
}

// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  typedCmdEl.textContent = command;
  cmdCursorEl.style.display = 'none';
  cmdOutputEl.hidden = false;
} else {
  typeCommand();
}

// fade-up keyframes injected via JS (kept out of critical CSS)
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleSheet);

// ===== Mobile nav toggle =====
const menuToggle = document.getElementById('menuToggle');
const filetree = document.getElementById('filetree');

menuToggle.addEventListener('click', () => {
  const isOpen = filetree.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

filetree.querySelectorAll('.file-item').forEach(link => {
  link.addEventListener('click', () => {
    filetree.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Active nav highlight on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.file-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(section => observer.observe(section));

// ===== Contact form (front-end only demo) =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = contactForm.name.value.trim();

  formStatus.hidden = false;
  formStatus.textContent = 'Sending...';

  try {
    const response = await fetch('https://formspree.io/f/xrpzazrz', {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formStatus.textContent = `✓ Message sent successfully! Thanks, ${name || 'there'}, for reaching out. I’ll get back to you shortly.`;
      contactForm.reset();
    } else {
      formStatus.textContent = '✗ Something went wrong. Please email me directly at nishagaur3577@gmail.com';
    }
  } catch (error) {
    formStatus.textContent = '✗ Something went wrong. Please email me directly at nishagaur3577@gmail.com';
  }
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();