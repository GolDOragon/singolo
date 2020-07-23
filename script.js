"use strict";

// navigation bar
const navigation = document.getElementById("menu");

function changeNavigationActive() {
  function hideBurger() {
    burger.classList.remove("burger-menu_active");
    document
      .getElementsByClassName("header")[0]
      .classList.remove("burger-menu_active");
    burger.parentElement.classList.remove("burger-menu_active");
    burger.nextElementSibling.children[0].classList.remove(
      "burger-menu_active"
    );
    burger.nextElementSibling.children[1].classList.remove(
      "burger-menu_active"
    );
    document.getElementById("menu").classList.remove("burger-menu_active");
  }

  function addActive(target) {
    target.classList.add("active");
  }

  function removeActive() {
    navigation
      .querySelectorAll("a")
      .forEach((el) => el.classList.remove("active"));
  }

  const homePos = document.getElementById("home").offsetTop;
  const servicesPos = document.getElementById("services").offsetTop - 95;
  const portfolioPos = document.getElementById("portfolio").offsetTop - 95;
  const aboutUsPos = document.getElementById("about-us").offsetTop - 95;
  const contactsPos = document.getElementById("contacts").offsetTop - 95;

  const menu = document.getElementsByClassName("navigation_list-item");
  const currentPos = window.pageYOffset;

  hideBurger();
  removeActive();

  if (servicesPos > currentPos) {
    addActive(menu[0]);
  } else if (portfolioPos > currentPos) {
    addActive(menu[1]);
  } else if (aboutUsPos > currentPos) {
    addActive(menu[2]);
  } else if (contactsPos > currentPos) {
    addActive(menu[3]);
  } else {
    addActive(menu[4]);
  }

  if (currentPos > servicesPos) {
    document.getElementsByClassName("wrapper")[0].classList.add("small");
  } else {
    document.getElementsByClassName("wrapper")[0].classList.remove("small");
  }
}

document.addEventListener("scroll", changeNavigationActive);

// -------------------------------------------------------------
// open/close burger menu
const burger = document.getElementsByClassName("burger")[0];

function clickOnBurger() {
  burger.classList.toggle("burger-menu_active");
  document
    .getElementsByClassName("header")[0]
    .classList.toggle("burger-menu_active");
  burger.parentElement.classList.toggle("burger-menu_active");
  burger.nextElementSibling.children[0].classList.toggle("burger-menu_active");
  burger.nextElementSibling.children[1].classList.toggle("burger-menu_active");
  document.getElementById("menu").classList.toggle("burger-menu_active");
}

burger.addEventListener("click", clickOnBurger);

// -------------------------------------------------------------
// screen on/off
const phones = document.getElementById("phones");

phones.addEventListener("click", (event) => {
  let target = event.target;

  if (target.classList.contains("screen")) {
    target.classList.toggle("active");
  } else if (target.classList.contains("iPhone")) {
    let sibling = target.nextElementSibling;
    sibling.classList.toggle("active");
  }
});

// -------------------------------------------------------------
// change images order
const tags = document.getElementById("tags");
const imagesArray = document.getElementById("portfolio-img");

tags.addEventListener("click", (event) => {
  imagesArray.appendChild(imagesArray.firstChild);
});

// -------------------------------------------------------------
// image selection
imagesArray.addEventListener("click", (event) => {
  const target = event.target;

  if (target.tagName === "IMG") {
    imagesArray
      .querySelectorAll("img")
      .forEach((el) => el.classList.remove("active"));
    target.classList.add("active");
  } else {
    imagesArray
      .querySelectorAll("img")
      .forEach((el) => el.classList.remove("active"));
  }
});

// -------------------------------------------------------------
// message submit
function writeMessage() {
  let subject = document.getElementById("subject").value.toString();
  let description = document.getElementById("description").value.toString();

  document.getElementById("text-subject").innerHTML = subject
    ? "Тема:" + subject
    : "Без темы";
  document.getElementById("text-describe").innerHTML = description
    ? "Описание:" + description
    : "Без описания";
}

const message = document.getElementById("message-block");
const toggleHidden = () => message.classList.toggle("hidden");

function onFormSubmit(event) {
  event.preventDefault();
  writeMessage();
  toggleHidden();
}

const form = document.querySelector(".quote-form_form");
form.addEventListener("submit", onFormSubmit);

document.getElementById("close-button").addEventListener("click", () => {
  toggleHidden();
  form.reset();
});

// -------------------------------------------------------------
// slide elements
let items = document.querySelectorAll(".item");
let currentItem = 0;
let isEnable = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnable = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("active", direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnable = true;
  });
}

function previousItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
}

function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
}

document.querySelector(".control.left").addEventListener("click", function () {
  if (isEnable) {
    previousItem(currentItem);
  }
});

document.querySelector(".control.right").addEventListener("click", function () {
  if (isEnable) {
    nextItem(currentItem);
  }
});
