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
      "Guatemala’s history stretches back more than 3,000 years to the ancient Maya civilization, known for their astronomical knowledge, advanced mathematics, and monumental architecture. After the Spanish arrived in the 16th century, cultures blended, shaping the unique identity seen today. Guatemala later achieved independence in 1821 and has since become a nation rich in archaeological sites, colonial heritage, and resilient cultural traditions."
  },

  culture: {
    title: "Guatemalan Culture",
    description:
      "Guatemalan culture is a vibrant blend of 22 indigenous Maya groups, Spanish influence, and modern Latin American traditions. Colorful textiles, marimba music, traditional dances, and regional foods give each community a unique identity. Languages such as K’iche’, Q’eqchi’, and Mam remain actively spoken, and artisan markets across the country reflect centuries-old craftsmanship passed down through generations."
  },

  traditions: {
    title: "Guatemalan Traditions",
    description:
      "Guatemala is famous for its powerful traditions rooted in faith, community, and creativity. Semana Santa processions in Antigua are world-renowned for their elaborate floats and vibrant carpets made of colored sawdust. Each November, giant kites soar over Sumpango to honor loved ones, while Día de los Santos, Las Posadas, and ceremonial dances preserve ancestral customs that continue to unite Guatemalan families today."
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
