(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const bars = document.querySelectorAll(".progress-bar");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const fill = (bar) => {
    const level = bar.getAttribute("data-level") || "0";
    bar.style.width = `${level}%`;
  };

  if (reduceMotion) {
    bars.forEach(fill);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        fill(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
})();
