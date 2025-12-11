export async function loadFooter() {
  const footerElement = document.querySelector("footer");

  if (!footerElement) return;

  try {
    // ✔ Must use relative path for GitHub Pages
    const response = await fetch("./partials/footer.html");
    const footerHTML = await response.text();
    footerElement.innerHTML = footerHTML;

    // Load getdate.js AFTER footer is inserted
    import("./getdate.js").then(module => {
      if (module.loadDateInfo) {
        module.loadDateInfo();
      }
    });

  } catch (error) {
    console.error("Error loading footer:", error);
  }
}
