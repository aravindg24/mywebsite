(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clock = document.querySelector('#clock');
  const updateClock = () => {
    if (!clock) return;
    clock.textContent = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date());
  };
  updateClock();
  setInterval(updateClock, 30000);

  const typingLine = document.querySelector('.typing-line');
  if (typingLine) {
    const text = typingLine.dataset.text || '';
    if (reduced) typingLine.textContent = text;
    else {
      let index = 0;
      const type = () => {
        typingLine.textContent = text.slice(0, index++);
        if (index <= text.length) setTimeout(type, 42);
      };
      setTimeout(type, 700);
    }
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    reveals.forEach((item) => observer.observe(item));
  } else reveals.forEach((item) => item.classList.add('visible'));

  if (!reduced && matchMedia('(pointer:fine)').matches) {
    const driftItems = document.querySelectorAll('[data-drift]');
    let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
    addEventListener('pointermove', (event) => {
      targetX = event.clientX / innerWidth - .5;
      targetY = event.clientY / innerHeight - .5;
    }, { passive: true });
    const drift = () => {
      pointerX += (targetX - pointerX) * .045;
      pointerY += (targetY - pointerY) * .045;
      driftItems.forEach((item) => {
        const amount = Number(item.dataset.drift || 8);
        const base = item.classList.contains('hero-console') ? 'translateX(-50%) ' : '';
        item.style.transform = `${base}translate3d(${pointerX * amount}px,${pointerY * amount}px,0)`;
      });
      requestAnimationFrame(drift);
    };
    requestAnimationFrame(drift);
  }
})();
