function openPaint() {
  const paintWindow = document.getElementById("paintWindow");
  paintWindow.style.display = "block";

  $(JavascriptCompiler).resizable();
  initializePaint();
}

function initializePaint() {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  let isPainting = false;

  canvas.addEventListener("mousedown", startPaint);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", endPaint);
  canvas.addEventListener("mouseleave", endPaint);

  function startPaint(e) {
    isPainting = true;
    draw(e);
  }

  function draw(e) {
    if (!isPainting) return;

    const x = e.offsetX / (canvas.offsetWidth / canvas.width);
    const y = e.offsetY / (canvas.offsetHeight / canvas.height);

    context.lineWidth = 2;
    context.lineCap = "round";
    context.strokeStyle = "black";

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  }

  function endPaint() {
    isPainting = false;
    context.beginPath();
  }
}

function clearCanvas() {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}