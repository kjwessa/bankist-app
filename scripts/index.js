"use strict";

//* Variables
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const initalCoords = section1.getBoundingClientRect();
const header = document.querySelector(".header");
const message = document.createElement("div");
const navHeight = nav.getBoundingClientRect().height;
const imgTargets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

//* Add smooth scrolling to the "Learn More" button
btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

//* Add smooth scrolling using event delegation
document.querySelector(".nav__links").addEventListener("click", function (evt) {
  // prevent default behavior of anchor link
  evt.preventDefault();
  // Matching strategy
  if (evt.target.classList.contains("nav__link")) {
    // Get the href attribute of the clicked link
    const id = evt.target.getAttribute("href");
    // Scroll to the section with the id of the clicked link
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//* Tabbed Content Component
tabsContainer.addEventListener("click", function (evt) {
  // Get the clicked tab element
  const clicked = evt.target.closest(".operations__tab");
  // Prevent the function from running if the clicked element is not a tab
  if (!clicked) return;

  // Remove the active class from all tabs
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  // Remove the active class from all content areas
  tabsContent.forEach((content) => {
    content.classList.remove("operations__content--active");
  });

  // Add the active class to the clicked tab
  clicked.classList.add("operations__tab--active");
  // Activate the content area for the related tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//* Menu Fade Animation Handler
const handleHover = function (evt) {
  // Ensure the mouseover event only fires on the nav__link elements
  if (evt.target.classList.contains("nav__link")) {
    // Get the link that was hovered over
    const link = evt.target;
    // Get all the sibling links
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    // Get the logo
    const logo = link.closest(".nav").querySelector("img");
    // Adjust the opacity of the hovered over link and the logo
    siblings.forEach((el) => {
      // Don't modify the opacity of the hovered over link
      if (el !== link) {
        el.style.opacity = this;
      }
      // Adjust the opacity of the logo
      logo.style.opacity = this;
    });
  }
};
//* Menu Fade Animation Event Listeners
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//* Modal Window
const openModal = function (evt) {
  evt.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => {
  return btn.addEventListener("click", openModal);
});
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//* Add cookie consent message

message.classList.add("cookie-message");
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
header.append(message);

//* Remove cookie message
document.querySelector(".btn--close-cookie").addEventListener("click", function () {
  message.remove();
});

//* Sticky Navigation: Intersection Observer API
const stickyNav = function (entries) {
  // Destructure the entries array to get the first entry
  const [entry] = entries;
  // Add the sticky class if the header is not intersecting the viewport
  if (!entry.isIntersecting) nav.classList.add("sticky");
  // Remove the sticky class if the header is intersecting the viewport
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  // Set the root to null to observe the viewport
  root: null,
  // The threshold of 0 will trigger when the header is completely out of view
  threshold: 0,
  // The rootMargin will trigger the callback when the header is 90px out of view
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//* Reveal Sections when they are in the viewport
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  // Destruce the array to get the first entry
  const [entry] = entries;
  // Exit the function if the entry is not intersecting
  if (!entry.isIntersecting) return;
  // Remove the hidden class from the section if it is intersecting
  entry.target.classList.remove("section--hidden");
  // Stop observing the section once it is revealed
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  // Set the root to null to observe the viewport
  root: null,
  // Set the threshold to 0.15 to trigger when 15% of the section is in the viewport
  threshold: 0.15,
});

allSections.forEach(function (section) {
  // Observe each section
  sectionObserver.observe(section);
  // Set the opacity of each section to 0
  // section.classList.add("section--hidden");
});

//* Lazy Load Images using the Intersection Observer API
const loadImg = function (entries, observer) {
  // Destructure the entries array to get the first entry
  const [entry] = entries;
  // Exit the function if the entry is not intersecting
  if (!entry.isIntersecting) return;
  // Replace the src attribute with the data-src attribute
  entry.target.src = entry.target.dataset.src;
  // Remove the lazy-img class once the image is loaded
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  // Stop observing the image once it is loaded
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  // Set the root to null to observe the viewport
  root: null,
  // Set the threshold to 0 to trigger when the image is in the viewport
  threshold: 0,
  // Set the rootMargin to 200px to trigger when the image is 200px in the viewport
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

//* Slider Component
slides.forEach((slide, i) => (slide.style.transform = `translateX(${100 * i}%)`));

// Establish the starting position of the slider
let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach((slide, i) => (slide.style.transform = `translateX(${100 * (i - curSlide)}%)`));
};

goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

// Move to the next slide
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
