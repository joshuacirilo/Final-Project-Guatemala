export function initNavigation() {
  // Query elements AFTER header is loaded
  const hamButton = document.querySelector("#ham-btn");
  const nav = document.querySelector("#nav-bar");

  if (!hamButton || !nav) {
    console.warn("Navigation elements not found");
    return;
  }

  // Toggle mobile menu
  hamButton.addEventListener("click", () => {
    nav.classList.toggle("show");
    hamButton.classList.toggle("show");
  });

  // Close menu when clicking a link
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
      hamButton.classList.remove("show");
    });
  });

  // Close menu on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
      nav.classList.remove("show");
      hamButton.classList.remove("show");
    }
  });
}
