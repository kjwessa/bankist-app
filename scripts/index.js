"use strict";

//* Variables
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (evt) {
  const s1coordinates = section1.getBoundingClientRect();
  window.scrollIntoView({ behavior: "smooth" });
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

//TODO Delete the code below after testing
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (evt) {
//     // Prevent default behavior of anchor link
//     evt.preventDefault();
//     // Get the href attribute of the clicked link
//     const id = this.getAttribute("href");
//     // Scroll to the section with the id of the clicked link
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

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

// const randomINT = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const randomColor = function () {
//   return `rgb(${randomINT(0, 255)}, ${randomINT(0, 255)}, ${randomINT(0, 255)})`;
// };

// console.log(randomColor());

// //* Add event listener to nav links
// document.querySelector(".nav__link").addEventListener("click", function (evt) {
//   evt.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log(evt.target);
// });

// document.querySelector(".nav__links").addEventListener("click", function (evt) {
//   evt.preventDefault();
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector(".nav").addEventListener("click", function (evt) {
//   evt.preventDefault();
//   this.style.backgroundColor = randomColor();
// });
