document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  const backToTop = document.getElementById("backToTop");
  const revealItems = document.querySelectorAll(".section-reveal, .fade-up");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  function scrollToContact() {
    const target = document.getElementById("hubungi");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  window.scrollToContact = scrollToContact;

  window.addEventListener("scroll", () => {
    if (!backToTop) return;
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));

  const statCards = document.querySelectorAll(".stats-row .hero-card .fs-4");
  const finalValues = [8000000, 500, 1000];
  let hasAnimated = false;

  function formatRupiah(value, compact = false) {
    if (compact && value >= 1000000) {
      return "Rp" + (value / 1000000).toFixed(0) + ".000.000";
    }
    return "Rp" + value.toLocaleString("id-ID");
  }

  function animateValue(el, end, duration, compact = false) {
    let start = 0;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      el.textContent = formatRupiah(current, compact);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = formatRupiah(end, compact);
      }
    }

    requestAnimationFrame(update);
  }

  const statsSection = document.querySelector(".stats-row");
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          if (statCards[0]) animateValue(statCards[0], finalValues[0], 1200, true);
          if (statCards[1]) animateValue(statCards[1], finalValues[1], 900, false);
          if (statCards[2]) animateValue(statCards[2], finalValues[2], 900, false);
        }
      });
    }, { threshold: 0.4 });

    statsObserver.observe(statsSection);
  }
});
