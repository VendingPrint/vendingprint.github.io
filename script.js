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
  const finalValues = [7500000, 500000, 500, 1000];
  let hasAnimated = false;

  function formatRupiah(value) {
    return "Rp" + value.toLocaleString("id-ID");
  }

  function animateValue(el, end, duration) {
    let start = 0;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      el.textContent = formatRupiah(current);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = formatRupiah(end);
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
          statCards.forEach((card, index) => {
            if (finalValues[index]) {
              animateValue(card, finalValues[index], index === 0 ? 1200 : 900);
            }
          });
        }
      });
    }, { threshold: 0.4 });

    statsObserver.observe(statsSection);
  }
});
