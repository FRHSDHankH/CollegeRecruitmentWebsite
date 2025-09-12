// I used chatgpt to have like scroll trigger even though I have overflow hidden on

let scrolled = false;

window.addEventListener("wheel", function (e) {
  const logo = document.getElementById("rutgers-logo");
  const logoSm = document.getElementById("rutgers-logo-sm");
  const scrollText = document.getElementById("scroll-text");

  if (e.deltaY > 0) {
    // scroll down
    logo.classList.add("logo-fixed");
    logoSm.classList.add("logo-fixed");
    scrollText.classList.add("hidden");
  } else {
    // scroll up
    logo.classList.remove("logo-fixed");
    logoSm.classList.remove("logo-fixed");
    scrollText.classList.remove("hidden");
  }
});

