function updateTime() {
  const today = new Date();
  const hours24 = today.getHours();
  let hours12;
  let minutes = today.getMinutes();
  let suffix = "";

  if (hours24 >= 12) {
    suffix = " PM";
    hours12 = hours24 % 12;
  } else {
    suffix = " AM";
    hours12 = hours24;
  }

  if (minutes % 10 == 0) {
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const time = hours12 + ":" + minutes + suffix;

  const timeBox = document.querySelector(".start_time-text");

  timeBox.innerHTML = time;
}

setInterval(updateTime, 1000);

const startButton = document.querySelector(".start_button");

const startMenu = document.querySelector(".start_menu-main");

const body = document.querySelector("body");

const myComputerButton = document.querySelector('.computer');

const programsItem = document.querySelector(".programs");

const programsMenu = document.querySelector(".sub_programs");

body.onclick = function (e) {
  for (let i = 0, l = e.target.classList.length; i < l; ++i) {
    if (/start_.*/.test(e.target.classList[i]) || e.target.classList[i].includes('computer')) {
      break;
    } else {
      startMenu.classList.remove("menu-open");
    }
  }
};

function menuDisplay(menu) {
  if (menu.classList.contains("menu-open")) {
    menu.classList.remove("menu-open");
  } else {
    menu.classList.add("menu-open");
  }
}

startButton.addEventListener("click", function () {
  menuDisplay(startMenu);
});

myComputerButton.addEventListener("click", function () {
  menuDisplay(startMenu);
});

programsItem.addEventListener("click", function () {
  menuDisplay(programsMenu);
});

const desktopIcons = document.getElementsByClassName("desktop-icon");

for (let i = 0; i < desktopIcons.length; i++) {
  dragElement(desktopIcons[i]);
}

function dragElement(el) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
    el.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;

    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    el.style.top = el.offsetTop - pos2 + "px";
    el.style.left = el.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}