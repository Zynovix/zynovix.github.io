const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach(item => {
    item.style.transitionDelay = "0ms";
    item.classList.add("visible");
  });
} else {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const item = entry.target;
        const parent = item.parentElement;
        const siblings = parent
          ? Array.from(parent.children).filter(child => child.classList.contains("reveal"))
          : [];
        const index = Math.max(0, siblings.indexOf(item));

        // A short stagger keeps the animation smooth without delaying lower cards.
        item.style.transitionDelay = `${Math.min(index % 3, 2) * 90}ms`;
        item.classList.add("visible");
        observer.unobserve(item);
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -24px 0px"
    }
  );

  revealItems.forEach(item => observer.observe(item));
}
