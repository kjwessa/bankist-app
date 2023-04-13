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

//* Sticky Navigation
window.addEventListener("scroll", function () {
  console.log(window.scrollY);
  if (window.scrollY > initalCoords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});

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
const header = document.querySelector(".header");
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
header.append(message);

//* Remove cookie message
document.querySelector(".btn--close-cookie").addEventListener("click", function () {
  message.remove();
});
