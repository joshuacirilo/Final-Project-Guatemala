// Loads place cards dynamically and adds buttons for video and map features.

// Path to local JSON file
const url = "./data/places.json";

// Main container for the cards
const cards = document.querySelector("#cards");

// Load places once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  getPlacesData();
});

// Fetch places JSON
async function getPlacesData() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to load places data.");

    const data = await response.json();
    displayPlaces(data.places);

  } catch (error) {
    console.error("Error loading places data:", error);
  }
}

// Display place cards
function displayPlaces(places) {
  if (!cards) return;

  places.forEach(place => {
    const { name, description, location, image_url } = place;

    // Create card container
    const card = document.createElement("section");
    card.classList.add("place-card");

    // Create elements
    const img = document.createElement("img");
    img.src = image_url;
    img.alt = `Image of ${name}`;
    img.loading = "lazy";

    const title = document.createElement("h2");
    title.textContent = name;

    const desc = document.createElement("p");
    desc.textContent = description;

    const loc = document.createElement("p");
    loc.textContent = `📍 ${location}`;

    // === NEW BUTTONS ===
    const videoBtn = document.createElement("button");
    videoBtn.textContent = "Watch Video";
    videoBtn.classList.add("video-btn");

    const mapBtn = document.createElement("button");
    mapBtn.textContent = "View Map";
    mapBtn.classList.add("map-btn");

    // Placeholder events (we will replace these with API functions later)
    videoBtn.addEventListener("click", () => {
      console.log(`Load video for: ${name}`);
      alert(`Video feature coming soon for ${name}!`);
    });

    mapBtn.addEventListener("click", () => {
      console.log(`Load map for: ${name}`);
      alert(`Map feature coming soon for ${name}!`);
    });

    // Append everything to card
    card.append(img, title, desc, loc, videoBtn, mapBtn);

    // Add card to the container
    cards.appendChild(card);
  });
}
