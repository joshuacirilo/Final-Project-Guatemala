export async function loadFooter() {
  const footerElement = document.querySelector("footer");

  if (!footerElement) return;

  try {
    const response = await fetch("partials/footer.html");
    const footerHTML = await response.text();
    footerElement.innerHTML = footerHTML;

    // After the footer loads, run getdate
    import("./getdate.js").then(module => {
      module.loadDateInfo(); // If using modular version
    });
    
  } catch (error) {
    console.error("Error loading footer:", error);
  }
}
