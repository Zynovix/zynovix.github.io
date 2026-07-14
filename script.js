const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /*
    Keep all original site content visible immediately.
    This prevents any section on the homepage or other pages from disappearing.
  */
  document.querySelectorAll(".reveal").forEach(item => {
    item.classList.add("visible");
  });

  const blogCards = Array.from(
    document.querySelectorAll(".cards.three > article.card")
  );

  if (!blogCards.length || reduceMotion) return;

  const style = document.createElement("style");
  style.id = "zynovix-instant-card-animation";
  style.textContent = `
    .cards.three > article.card.zx-animate-card {
      opacity: 1 !important;
      transform: translateY(16px);
      transition:
        transform .42s cubic-bezier(.22, 1, .36, 1),
        box-shadow .42s ease,
        border-color .42s ease;
      will-change: transform;
    }

    .cards.three > article.card.zx-animate-card.zx-card-visible {
      opacity: 1 !important;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .cards.three > article.card.zx-animate-card {
        transform: none !important;
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  blogCards.forEach(card => {
    card.classList.add("zx-animate-card");
    card.classList.remove("zx-card-visible");
  });

  const revealCard = card => {
    card.classList.add("zx-card-visible");
  };

  if (!("IntersectionObserver" in window)) {
    blogCards.forEach(revealCard);
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        revealCard(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0,
      rootMargin: "220px 0px 220px 0px"
    }
  );

  requestAnimationFrame(() => {
    blogCards.forEach(card => observer.observe(card));
  });

  // Very fast safety fallback so no card ever waits.
  window.setTimeout(() => {
    blogCards.forEach(revealCard);
  }, 350);
});
