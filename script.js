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
