function ShowWindow(name) {
  const window_ = document.getElementById(name);
  window_.style.display = "block";

  $(window_).draggable();
}

function HideWindow(name) {
  const window_ = document.getElementById(name);
  window_.style.display = "none";
}

function toggleStartMenu() {
  const startMenu = document.getElementById("startMenu");
  if (startMenu.style.display === "block") {
    startMenu.style.display = "none";
  } else {
    startMenu.style.display = "block";
  }
}