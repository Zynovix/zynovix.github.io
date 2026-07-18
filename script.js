function initNavigation() {
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  if (!menuBtn || !navMenu) return;

  const closeMenu = () => {
    navMenu.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
  };

  menuBtn.setAttribute("aria-expanded", "false");

  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!revealItems.length) return;

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(item => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(item => observer.observe(item));
}

function initSite() {
  initNavigation();
  initRevealAnimations();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite, { once: true });
} else {
  initSite();
}
