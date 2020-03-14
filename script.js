"use strict";

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

