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

  // Preserve the site's original reveal system on every page.
  const originalRevealItems = Array.from(document.querySelectorAll(".reveal"));

  // Animate blog cards even when they do not have the reveal class.
  const blogCards = Array.from(
    document.querySelectorAll("body .cards.three > article.card")
  );

  if (blogCards.length) {
    const style = document.createElement("style");
    style.id = "zynovix-blog-card-reveal";
    style.textContent = `
      .cards.three > article.card.zx-card-ready {
        opacity: 0;
        transform: translateY(26px);
        transition:
          opacity .62s cubic-bezier(.22, 1, .36, 1),
          transform .62s cubic-bezier(.22, 1, .36, 1);
      }

      .cards.three > article.card.zx-card-ready.zx-card-visible {
        opacity: 1;
        transform: translateY(0);
      }

      @media (prefers-reduced-motion: reduce) {
        .cards.three > article.card.zx-card-ready {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
    `;
    document.head.appendChild(style);

    blogCards.forEach(card => card.classList.add("zx-card-ready"));
  }

  const showEverything = () => {
    originalRevealItems.forEach(item => item.classList.add("visible"));
    blogCards.forEach(card => card.classList.add("zx-card-visible"));
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    showEverything();
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const item = entry.target;

        if (item.classList.contains("reveal")) {
          item.classList.add("visible");
        }

        if (item.classList.contains("zx-card-ready")) {
          const rowIndex = blogCards.indexOf(item) % 3;
          item.style.transitionDelay = `${rowIndex * 90}ms`;
          item.classList.add("zx-card-visible");
        }

        observer.unobserve(item);
      });
    },
    {
      threshold: 0.01,
      rootMargin: "0px 0px 120px 0px"
    }
  );

  originalRevealItems.forEach(item => observer.observe(item));
  blogCards.forEach(card => observer.observe(card));

  // Safety fallback: no site content can remain hidden.
  window.setTimeout(showEverything, 1600);
});
