const slides = Array.from(document.querySelectorAll(".content-slide"));
const logo = document.getElementById("rutgers-logo");
const logoSm = document.getElementById("rutgers-logo-sm");
const scrollText = document.getElementById("scroll-text");

let currentSlide = -1; // -1 = logo stage
let scrolling = false;

function showSlide(index, direction) {
  if (index < 0 || index >= slides.length) return;

  slides.forEach((slide) => {
    slide.classList.remove("active", "exit-left", "exit-right");
  });

  if (currentSlide >= 0) {
    slides[currentSlide].classList.add(direction === "down" ? "exit-left" : "exit-right");
  }

  slides[index].classList.add("active");
  currentSlide = index;
}

window.addEventListener("wheel", (e) => {
  if (scrolling) return;
  scrolling = true;
  setTimeout(() => scrolling = false, 900);

  if (e.deltaY > 0) {
    // scroll down
    if (currentSlide === -1) {
      logo.classList.add("logo-fixed");
      logoSm.classList.add("logo-fixed");
      scrollText.classList.add("hidden");
      showSlide(0, "down");
    } else if (currentSlide < slides.length - 1) {
      showSlide(currentSlide + 1, "down");
    }
  } else {
    // scroll up
    if (currentSlide === 0) {
      // ONLY scroll up from the first slide returns the logo
      logo.classList.remove("logo-fixed");
      logoSm.classList.remove("logo-fixed");
      scrollText.classList.remove("hidden");
      slides[currentSlide].classList.add("exit-right");
      currentSlide = -1;
    } else if (currentSlide > 0) {
      // scroll up from slides beyond the first just shows previous slide
      showSlide(currentSlide - 1, "up");
    }
  }
});

// & All of the above is from chatgpt for the slides

