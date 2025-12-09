// Loads place cards dynamically and adds buttons for video and map features.

//Apis keys
const YT_API_KEY = "AIzaSyCIivTb6Jgo0Vsi6FaKLJ2qOmOnpodrmIQ";
const MAPS_API_KEY = "AIzaSyA3H522WMjut_zN8Ewcsv-52htSPYvVyE8";

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
    const { name, description, location, image_url, coordinates } = place;

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

    // === VIDEO BUTTON ===
    videoBtn.addEventListener("click", async () => {
      const videoId = await getYouTubeVideoId(name);

      if (!videoId) {
        alert("No video found for this location.");
        return;
      }

      // Check if video already exists
      let videoFrame = card.querySelector(".video-frame");

      if (!videoFrame) {
        videoFrame = document.createElement("iframe");
        videoFrame.classList.add("video-frame");
        videoFrame.width = "100%";
        videoFrame.height = "250";
        videoFrame.style.marginTop = "10px";
        videoFrame.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
        videoFrame.allowFullscreen = true;
        card.appendChild(videoFrame);
      }

      videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
    });

    // === MAP BUTTON ===
    mapBtn.addEventListener("click", () => {
      const { latitude, longitude } = coordinates;

      let mapFrame = card.querySelector(".map-frame");

      if (!mapFrame) {
        mapFrame = document.createElement("iframe");
        mapFrame.classList.add("map-frame");

        const embedURL = `https://www.google.com/maps/embed/v1/view?key=${MAPS_API_KEY}&center=${latitude},${longitude}&zoom=13&maptype=roadmap`;

        mapFrame.src = embedURL;
        mapFrame.width = "100%";
        mapFrame.height = "250";
        mapFrame.style.border = "0";
        mapFrame.style.marginTop = "10px";
        mapFrame.style.borderRadius = "12px";

        card.appendChild(mapFrame);

        mapFrame.onload = () => {
          mapFrame.classList.add("loaded");
        };
      }
    });

    // Append everything to card
    card.append(img, title, desc, loc, videoBtn, mapBtn);

    // Add card to the container
    cards.appendChild(card);
  });
}

// === YOUTUBE VIDEO SYSTEM WITH CACHE ===
async function getYouTubeVideoId(placeName) {
  const storageKey = `videoId_${placeName}`;

  const cachedId = localStorage.getItem(storageKey);
  if (cachedId) {
    console.log("Using cached videoId:", cachedId);
    return cachedId;
  }

  console.log("Fetching new videoId from YouTube API for:", placeName);

  const query = `${placeName} Guatemala travel`;
  const apiURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${YT_API_KEY}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const videoId = data.items[0].id.videoId;

    // Save to cache
    localStorage.setItem(storageKey, videoId);

    return videoId;

  } catch (error) {
    console.error("YouTube API error:", error);
    return null;
  }
}
