const slides = Array.from(document.querySelectorAll(".content-slide"));
const logo = document.getElementById("rutgers-logo");
const logoSm = document.getElementById("rutgers-logo-sm");
const scrollText = document.getElementById("scroll-text");

let currentSlide = -1; // -1 = logo stage
let scrolling = false;

// elements that carry per-element entrance animations
const animSelectorList = [
  ".slideDown", ".slideUp", ".slideLeft", ".slideRight",
  ".slideDown1", ".slideUp1", ".slideLeft1", ".slideRight1"
];
const animSelectors = animSelectorList.join(", ");

function prepareAndPlayAnimationsFor(slide) {
  if (!slide) return;
  const animElements = slide.querySelectorAll(animSelectors);
  if (animElements.length === 0) return;

  // 1) Put every anim element into the 'start' (snapped) state
  animElements.forEach(el => el.classList.add("start"));

  // 2) Make the slide visible first (so transforms happen while visible)
  //    Then on the next animation frame remove 'start' to let the transition run
  requestAnimationFrame(() => {
    // force layout to ensure browser applied the start state
    void slide.offsetWidth;
    // remove start -> element will transition into its normal position
    animElements.forEach(el => el.classList.remove("start"));
  });
}

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
  // We add 'start' BEFORE adding 'active' so they are off-screen when slide appears.
  const newAnimElems = newSlide.querySelectorAll(animSelectors);
  newAnimElems.forEach(el => el.classList.add("start"));

  // Show the slide (this will also bring it into the layout)
  newSlide.classList.add("active");

  // On next frame force reflow and then remove 'start' to trigger transitions.
  requestAnimationFrame(() => {
    void newSlide.offsetWidth;
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
      // ONLY scroll up from the first slide returns the logo
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
