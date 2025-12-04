export function initModal() {
  const modal = document.getElementById("infoModal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeBtn = document.querySelector(".close-btn");

  if (!modal || !closeBtn) return;

  const cardInfo = {
    history: {
      title: "Guatemalan History",
      description:
        "Guatemala’s history stretches back to the ancient Maya civilization..."
    },
    culture: {
      title: "Guatemalan Culture",
      description:
        "Guatemalan culture is a vibrant blend of indigenous and Spanish traditions."
    },
    traditions: {
      title: "Guatemalan Traditions",
      description:
        "From Semana Santa to the Kite Festival..."
    }
  };

  document.querySelectorAll(".card").forEach(card => {
    const key = card.dataset.key;
    card.addEventListener("click", () => {
      const info = cardInfo[key];
      if (!info) return;

      modalTitle.textContent = info.title;
      modalDescription.textContent = info.description;
      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
