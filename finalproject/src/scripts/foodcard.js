// Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", async () => {

  // Select the container where the food cards will be injected
  const container = document.querySelector("#food-container");

  // Path to the JSON file (relative to the src/ root in Vite)
  const jsonUrl = "./data/food.json";

  try {
    // Fetch the JSON file
    const response = await fetch(jsonUrl);

    // Throw an error if the file could not be loaded
    if (!response.ok) {
      throw new Error("Unable to load the JSON file.");
    }

    // Parse JSON data
    const data = await response.json();

    // Loop through each food item and build a card dynamically
    data.foods.forEach(food => {

      // Create the card container
      const card = document.createElement("div");
      card.classList.add("food-card");

      // Inject card content using template literals
      card.innerHTML = `
        <img src="${food.image}" alt="${food.name}" class="food-img">
        <h3>${food.name}</h3>

        <h4>Ingredients:</h4>
        <ul>
          ${food.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
        </ul>

        <p><strong>Fun fact:</strong> ${food.special_fact}</p>
      `;

      // Append each card to the main container
      container.appendChild(card);
    });

  } catch (error) {
    // Display the error in the console
    console.error("Error loading food data:", error);

    // Show a friendly message to the user
    container.innerHTML = `
      <p style="color:red;">
        We could not load the food data. Please try again later.
      </p>
    `;
  }
});
