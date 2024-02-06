// Formspree code
const form = document.getElementById("contact-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("alert");
  var data = new FormData(event.target);
  try {
    const response = await fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    });
    if (response.ok) {
      status.innerHTML = "Your message has been sent.";
    } else {
      throw new Error("Oops! There was a problem delivering your message, please contact via other means.");
    }
  } catch (error) {
    status.innerHTML = error.message;
  }
  document.querySelector(".alert_style").style.display = "block";
  // hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert_style").style.display = "none";
  }, 4000);
  form.reset();
}

form.addEventListener("submit", handleSubmit);

// FORM BORDERS 
const inputs = document.querySelectorAll("#contact-form input, #contact-form textarea");
inputs.forEach(input => {
  input.addEventListener("input", handleInputFocus);
  input.addEventListener("focusin", handleInputFocus);
  input.addEventListener("focusout", handleInputFocus);
});

function handleInputFocus(event) {
  const parent = event.target.parentNode;
  if (event.type === "input" && event.target.value.trim().length > 0) {
    parent.classList.add("valid");
    parent.classList.remove("invalid");
  } else if (event.type === "focusin") {
    parent.classList.add("focusIn");
  } else if (event.type === "focusout") {
    parent.classList.remove("focusIn");
  } else {
    parent.classList.add("invalid");
    parent.classList.remove("valid");
  }
}

function randomizePath() {
  const blobPath = document.getElementById('blobPath');
  const paths = [
    "M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z",
    // Add more paths here
  ];

  const randomPath = paths[Math.floor(Math.random() * paths.length)];
  blobPath.setAttribute('d', randomPath);
}

// Update path every 5 seconds
setInterval(randomizePath, 5000);



// Snowflake animation
document.addEventListener("DOMContentLoaded", function () {
  var MAX_SNOWFLAKES = 50;
  for (var i = 0; i < MAX_SNOWFLAKES; i++) {
    var snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.textContent = "❄";
    snowflake.style.top = Math.random() * 100 + "vh";
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.animationDuration = 5 + Math.random() * 10 + "s";
    snowflake.style.opacity = Math.random();
    document.body.appendChild(snowflake);
  }
});



// NAVIGATION PANEL
let navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// MENU SHOW
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// MENU HIDDEN
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// REMOVE MENU MOBILE
const navLinks = document.querySelectorAll(".nav_link");
navLinks.forEach(link => link.addEventListener("click", () => {
  navMenu.classList.remove("show-menu");
}));


// about 

// SKILLS
const skillHeaders = document.querySelectorAll(".skills_header");
const skillContents = document.querySelectorAll(".skill");

skillHeaders.forEach((header, index) => {
  header.addEventListener("click", function () {
    skillContents[index].classList.toggle("skills_open");
  });
});

// Function to animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skills_level_indicator");
  skillBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect();
    if (rect.top >= 0 && rect.top <= window.innerHeight && !bar.dataset.filled) {
      const skillLevel = bar.getAttribute("data-level");
      fillSkillBar(bar, skillLevel);
      bar.dataset.filled = true; // Set a flag to indicate that the bar has been filled
    }
  });
}

// Function to fill the skill bar with animation
function fillSkillBar(bar, level) {
  const fillAnimationDuration = 1500; // Adjust animation duration (in milliseconds)
  const endWidth = parseFloat(level); // Convert level to a numeric value
  const startTime = performance.now();
  const startWidth = parseFloat(bar.style.width) || 0; // Get the current width or default to 0

  function animate(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / fillAnimationDuration, 1);
    const width = startWidth + (progress * (endWidth - startWidth));
    bar.style.width = width + "%";

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

// Trigger animations when the page loads and on scroll
document.addEventListener("DOMContentLoaded", () => {
  animateSkillBars();

  window.addEventListener("scroll", () => {
    animateSkillBars();
  });
});




// QUALIFICATION TABS
let education = document.getElementById("education");
// let work = document.getElementById("work");
let educationHeader = document.getElementById("educationheader");
// let workHeader = document.getElementById("workheader");

// workHeader.style.color = "var(--text-color)";
educationHeader.style.color = "var(--first-color)";

educationHeader.addEventListener("click", () => {
  if (!work.classList.contains("qualification-inactive")) {
    education.classList.remove("qualification-inactive");
    work.classList.add("qualification-inactive");
    workHeader.style.color = "var(--text-color)";
    educationHeader.style.color = "var(--first-color)";
  }
});


// DARK/LIGHT THEME
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});