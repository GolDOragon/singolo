"use strict";

// navigation bar
const NAVIGATION = document.getElementById("menu");

function addActive(target) {
  target.classList.add("active");
}
function removeActive() {
  NAVIGATION.querySelectorAll("a").forEach(el => el.classList.remove("active"));
}

function changeNavigationActive() {
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
}

document.addEventListener("scroll", changeNavigationActive);

// -------------------------------------------------------------
// burger menu
const burger = document.getElementsByClassName("burger")[0];

function hideBurger() {
  burger.classList.remove("burger-menu_active");
  document
    .getElementsByClassName("header")[0]
    .classList.remove("burger-menu_active");
  burger.parentElement.classList.remove("burger-menu_active");
  burger.nextElementSibling.children[0].classList.remove("burger-menu_active");
  burger.nextElementSibling.children[1].classList.remove("burger-menu_active");
  document.getElementById("menu").classList.remove("burger-menu_active");
}
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
const SCREENS = document.getElementById("phones");

SCREENS.addEventListener("click", event => {
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
const TAGS = document.getElementById("tags");
const img_arr = document.body.children[3].children[1];

TAGS.addEventListener("click", event => {
  img_arr.appendChild(img_arr.firstChild);
});

// -------------------------------------------------------------
// image selection
const IMAGES = document.getElementById("portfolio-img");

IMAGES.addEventListener("click", event => {
  const target = event.target;

  if (target.classList.contains("active")) {
    target.classList.remove("active");
  } else {
    IMAGES.querySelectorAll("img").forEach(el => el.classList.remove("active"));
    target.classList.add("active");
  }
});

// -------------------------------------------------------------
// message submit
const writeMessage = () => {
  let subject = document.getElementById("subject").value.toString();
  let description = document.getElementById("description").value.toString();

  document.getElementById("text-subject").innerHTML = subject
    ? "Тема:" + subject
    : "Без темы";
  document.getElementById("text-describe").innerHTML = description
    ? "Описание:" + description
    : "Без описания";
};

const MESSAGE = document.getElementById("message-block");
const toggleHidden = () => MESSAGE.classList.toggle("hidden");

const onFormSubmit = e => {
  e.preventDefault();
  writeMessage();
  toggleHidden();
};

const FORM = document.querySelector(".quote-form_form");

FORM.addEventListener("submit", onFormSubmit);
document.getElementById("close-button").addEventListener("click", () => {
  toggleHidden();
  FORM.reset();
});

// -------------------------------------------------------------
// sliding elements
let items = document.querySelectorAll(".item");
let currentItem = 0;
let isEnable = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnable = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function() {
    this.classList.remove("active", direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function() {
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

document.querySelector(".control.left").addEventListener("click", function() {
  if (isEnable) {
    previousItem(currentItem);
  }
});

document.querySelector(".control.right").addEventListener("click", function() {
  if (isEnable) {
    nextItem(currentItem);
  }
});
