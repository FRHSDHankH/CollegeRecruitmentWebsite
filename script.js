const slides = Array.from(document.querySelectorAll(".content-slide"));
const logo = document.getElementById("rutgers-logo");
const logoSm = document.getElementById("rutgers-logo-sm");
const scrollText = document.getElementById("scroll-text");

let currentSlide = -1; // -1 = logo stage
let scrolling = false;

// elements that carry per-element entrance animations
const animSelectorList = [
  // desktop
  ".slideDown", ".slideUp", ".slideLeft", ".slideRight",
  ".slideDown1", ".slideUp1", ".slideLeft1", ".slideRight1",
  // small/mobile
  ".slideDownSmall", ".slideUpSmall", ".slideLeftSmall", ".slideRightSmall",
  ".slideDownSmall1", ".slideUpSmall1", ".slideLeftSmall1", ".slideRightSmall1"
];
const animSelectors = animSelectorList.join(", ");

function showSlide(index, direction) {
  if (index < 0 || index >= slides.length) return;

  // clear states on all slides
  slides.forEach(s => s.classList.remove("active", "exit-left", "exit-right"));

  // set exit for previous slide so it animates out
  if (currentSlide >= 0) {
    slides[currentSlide].classList.add(direction === "down" ? "exit-left" : "exit-right");
  }

  const newSlide = slides[index];

  // Prepare child elements to start off-screen (snapped)
  const newAnimElems = newSlide.querySelectorAll(animSelectors);
  newAnimElems.forEach(el => el.classList.add("start"));

  // Show the slide
  newSlide.classList.add("active");

  // On next frame remove 'start' so transitions fire
  requestAnimationFrame(() => {
    void newSlide.offsetWidth; // force reflow
    newAnimElems.forEach(el => el.classList.remove("start"));
  });

  currentSlide = index;
}

window.addEventListener("wheel", (e) => {
  if (scrolling) return;
  scrolling = true;
  setTimeout(() => scrolling = false, 900);

  if (e.deltaY > 0) {
    // scroll down
    if (currentSlide === -1) {
      logo && logo.classList.add("logo-fixed");
      logoSm && logoSm.classList.add("logo-fixed");
      scrollText && scrollText.classList.add("hidden");
      showSlide(0, "down");
    } else if (currentSlide < slides.length - 1) {
      showSlide(currentSlide + 1, "down");
    }
  } else {
    // scroll up
    if (currentSlide === 0) {
      logo && logo.classList.remove("logo-fixed");
      logoSm && logoSm.classList.remove("logo-fixed");
      scrollText && scrollText.classList.remove("hidden");
      slides[currentSlide].classList.add("exit-right");
      currentSlide = -1;
    } else if (currentSlide > 0) {
      showSlide(currentSlide - 1, "up");
    }
  }
});

// Reset to first page when clicking the small Rutgers logo
[logo, logoSm].forEach(el => {
  if (!el) return;
  el.addEventListener("click", () => {
    // Reset current slide
    if (currentSlide >= 0) {
      slides[currentSlide].classList.remove("active", "exit-left", "exit-right");
    }
    currentSlide = -1;

    // Reset logo + scroll text
    logo && logo.classList.remove("logo-fixed");
    logoSm && logoSm.classList.remove("logo-fixed");
    scrollText && scrollText.classList.remove("hidden");
  });
});
