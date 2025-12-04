document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#food-container");

  const jsonUrl = './data/food.json';

  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");

    const data = await response.json();

    data.foods.forEach(food => {
      const card = document.createElement("div");
      card.classList.add("food-card");

      card.innerHTML = `
        <img src="${food.image}" alt="${food.name}" class="food-img">
        <h3>${food.name}</h3>
        <h4>Ingredients:</h4>
        <ul>
          ${food.ingredients.map(ing => `<li>${ing}</li>`).join("")}
        </ul>
        <p><strong>Fun fact:</strong> ${food.special_fact}</p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error cargando las comidas:", error);
    container.innerHTML = `<p style="color:red;">No se pudieron cargar los datos de las comidas.</p>`;
  }
});
