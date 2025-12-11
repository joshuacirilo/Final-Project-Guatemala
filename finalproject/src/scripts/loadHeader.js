export async function loadHeader() {
  const headerPlaceholder = document.querySelector("#header-placeholder");

  if (!headerPlaceholder) return;

  try {
    // ✔ MUST be relative path for GitHub Pages
    const response = await fetch("./partials/header.html");
    const headerHTML = await response.text();
    headerPlaceholder.innerHTML = headerHTML;

    // After header loads → run the navigation script
    import("./navigation.js").then(module => {
      module.initNavigation();
    });

  } catch (error) {
    console.error("Error loading header:", error);
  }
}
