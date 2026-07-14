const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

/*
  Reliable blog-card reveal animation.
  This version does not depend on the existing .reveal CSS, so every card
  including the final row animates consistently.
*/
document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".cards.three > .card"));
  if (!cards.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    cards.forEach(card => {
      card.style.opacity = "1";
      card.style.transform = "none";
    });
    return;
  }

  // Inject isolated animation CSS so existing site styles remain untouched.
  const style = document.createElement("style");
  style.id = "zynovix-card-reveal-fix";
  style.textContent = `
    .cards.three > .card {
      opacity: 0;
      transform: translate3d(0, 34px, 0) scale(.985);
      transition:
        opacity .62s cubic-bezier(.22, 1, .36, 1),
        transform .62s cubic-bezier(.22, 1, .36, 1);
      will-change: opacity, transform;
    }

    .cards.three > .card.zx-card-visible {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
    }
  `;
  document.head.appendChild(style);

  // Force the hidden starting state to be painted before revealing any card.
  cards.forEach(card => {
    card.classList.remove("visible", "zx-card-visible");
    card.style.transitionDelay = "0ms";
  });

  const revealCard = (card) => {
    const index = cards.indexOf(card);
    const delay = (index % 3) * 110;

    window.setTimeout(() => {
      card.style.transitionDelay = `${delay}ms`;
      card.classList.add("zx-card-visible");
    }, 80);
  };

  if (!("IntersectionObserver" in window)) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => cards.forEach(revealCard));
    });
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
      threshold: 0.01,
      rootMargin: "0px 0px 90px 0px"
    }
  );

  // Two frames ensure even cards visible after browser scroll restoration animate.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      cards.forEach(card => observer.observe(card));
    });
  });

  // Safety fallback: no card stays invisible if the observer is interrupted.
  window.setTimeout(() => {
    cards.forEach(card => {
      if (!card.classList.contains("zx-card-visible")) {
        card.style.transitionDelay = "0ms";
        card.classList.add("zx-card-visible");
      }
    });
  }, 2200);
});
