"use strict";

// Navigation bar
const NAVIGATION = document.getElementById("menu");

NAVIGATION.addEventListener("click", event => {
  let target = event.target;

  if (target.classList.contains("navigation_list-item")) {
    NAVIGATION.querySelectorAll("a").forEach(el =>
      el.classList.remove("active")
    );
    target.classList.add("active");
  }
});

// Screen on/off
const SCREENS = document.getElementById("phones");

SCREENS.addEventListener("click", event => {
  let target = event.target;

  if (target.classList.contains("screen")) {
    target.classList.remove("active");
  } else if (target.classList.contains("iPhone")) {
    let sibling = target.nextElementSibling;
    if (sibling.classList.contains("active")) {
      sibling.classList.remove("active");
    } else {
      sibling.classList.add("active");
    }
  }
});

// change img order
const TAGS = document.getElementById("tags");
const img_arr = document.body.children[3].children[1];

TAGS.addEventListener("click", event => {
  // console.log(event.target.previousElementSibling);
  // if (event.target.previousElementSibling.hasAttribute("checked")) {
  //   console.log("checked");
  // }
  img_arr.appendChild(img_arr.firstChild);
});

// image selection
const IMAGES = document.getElementById("portfolio-img");

IMAGES.addEventListener("click", event => {
  let target = event.target;
  if (!target.classList.contains("portfolio_images")) {
    IMAGES.querySelectorAll("img").forEach(el => el.classList.remove("active"));
    target.classList.add("active");
  }
});

// message submit
const MESSAGE = document.getElementById("message-block");
const FORM = document.querySelector(".quote-form_form");

const writeMessage = () => {
  let subject = document.getElementById("subject").value.toString();
  let description = document.getElementById("description").value.toString();

  document.getElementById("text-subject").innerHTML = subject
    ? "Тема: " + subject
    : "Без темы";
  document.getElementById("text-describe").innerHTML = description
    ? "Описание: " + description
    : "Без описания";
};

const toggleHidden = () => MESSAGE.classList.toggle("hidden");

const onFormSubmit = e => {
  e.preventDefault();
  writeMessage();
  toggleHidden();
  FORM.reset();
  // return false;
};

FORM.addEventListener("submit", onFormSubmit);
document.getElementById("close-button").addEventListener("click", toggleHidden);


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
