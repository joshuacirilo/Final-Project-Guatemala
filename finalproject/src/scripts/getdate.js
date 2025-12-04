export function loadDateInfo() {
  const yearElement = document.querySelector("#year");
  const modifiedElement = document.querySelector("#last-modified");

  const today = new Date();

  if (yearElement) {
    yearElement.innerHTML = `© ${today.getFullYear()} 🔭 Joshua Cirilo Alegría 🔭 Guatemala`;
  }

  if (modifiedElement) {
    modifiedElement.textContent = `Last Modification: ${document.lastModified}`;
  }
}
