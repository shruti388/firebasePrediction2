const API_KEY = "bfe596fa6f7613c874732abe912fe034";

// PAGE 1 → PAGE 2
function getWeather() {
  const city = document.getElementById("cityInput").value.trim(); // remove extra spaces

  // Check if city is entered
  if (city === "") {
    alert("⚠️ Please enter a city name!");
    return; // stop further execution
  }

  // Fetch weather data if city is entered
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => {
      if (!response.ok) {
        alert("❌ City not found! Please enter a valid city name.");
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem("weatherData", JSON.stringify(data));
      window.location.href = "weather.html";
    })
    .catch(error => {
      console.log(error);
    });
}


// PAGE 2 → PAGE 3
function showWeather() {
  const data = JSON.parse(localStorage.getItem("weatherData"));

  document.getElementById("temp").innerText =
    ` 🌡️ Temperature: ${data.main.temp} °C`;

  document.getElementById("wind").innerText =
    `💨 Wind Speed: ${data.wind.speed} m/s`;

  document.getElementById("humidity").innerText =
    `💧 Humidity: ${data.main.humidity}%`;

  document.getElementById("condition").innerText =
    ` 🌤️ Condition: ${data.weather[0].main}`;

  setTimeout(() => {
    window.location.href = "risk.html";
  }, 3000);
}

function showRisk() {
  const data = JSON.parse(localStorage.getItem("weatherData"));
  const condition = data.weather[0].main.toLowerCase();
  let score = 0;
  let name = "LOW";

  if (condition.includes("thunder")) { score = 90; name = "HIGH"; }
  else if (condition.includes("snow")) { score = 80; name = "HIGH"; }
  else if (condition.includes("rain")) { score = 60; name = "MODERATE"; }
  else if (condition.includes("fog")) { score = 50; name = "MODERATE"; }
  else { score = 20; name = "LOW"; }

  // Display score and risk category
  document.getElementById("riskScore").innerText = score;
  document.getElementById("riskName").innerText = name;

  // Change risk-box color based on category
  const riskBox = document.querySelector(".risk-box");
  if (name === "HIGH") riskBox.style.background = "rgba(255, 0, 0, 0.2)";
  else if (name === "MODERATE") riskBox.style.background = "rgba(255, 165, 0, 0.2)";
  else riskBox.style.background = "rgba(0, 255, 0, 0.2)";

  // Store condition text to display later
  localStorage.setItem("riskCondition", condition);

  // Redirect to image page after 3 seconds
  setTimeout(() => {
    window.location.href = "image.html";
  }, 3000);
}

// Toggle weather condition display when button clicked
function toggleCondition() {
  const conditionDiv = document.getElementById("weatherCondition");
  const condition = localStorage.getItem("riskCondition");

  if (conditionDiv.style.display === "none" || conditionDiv.style.display === "") {
    conditionDiv.style.display = "block";
    // Map the condition to user-friendly text based on score/risk
    const score = parseInt(document.getElementById("riskScore").innerText);
    let displayCondition = "";

    if (score >= 70) displayCondition = "Severe Weather Condition";
    else if (score >= 40) displayCondition = "Moderate Weather Condition";
    else displayCondition = "Normal Weather Condition";

    conditionDiv.innerText = `Weather: ${displayCondition} (${condition})`;
  } else {
    conditionDiv.style.display = "none";
  }
}

function showImage() {
  const data = JSON.parse(localStorage.getItem("weatherData"));
  const condition = data.weather[0].main.toLowerCase();
  const img = document.getElementById("conditionImg");
  const riskLevelDiv = document.getElementById("riskLevel");
  const riskMessageDiv = document.getElementById("riskMessage");

  let riskLevel = "LOW";
  let riskMessage = "Safe to drive 🚗";
  let imgSrc = "clearCloud.jpg"; // default image

  if (condition.includes("thunder") || condition.includes("storm")) {
    imgSrc = "storm.jpg";
    riskLevel = "HIGH";
    riskMessage = "Avoid travel! ⚠️";
  } else if (condition.includes("snow")) {
    imgSrc = "snow.jpg";
    riskLevel = "HIGH";
    riskMessage = "High risk! Drive carefully! ❄️";
  } else if (condition.includes("rain")) {
    imgSrc = "rain.jpg";
    riskLevel = "MODERATE";
    riskMessage = "Moderate risk! Drive carefully 🌧️";
  } else if (condition.includes("fog")) {
    imgSrc = "fog.jpg";
    riskLevel = "MODERATE";
    riskMessage = "Moderate risk! Drive cautiously 🌫️";
  } else {
    imgSrc = "clearCloud.jpg"; // clear/clouds
    riskLevel = "LOW";
    riskMessage = "Safe to drive 🚗";
  }

  img.src = imgSrc;
  riskLevelDiv.innerText = `Risk Level: ${riskLevel}`;
  riskMessageDiv.innerText = riskMessage;
}

// function goBack() {
//   window.location.href = "index.html"; 
// }

function goToUpdate() {
  window.location.href = "http://127.0.0.1:5500/update.html";
}




