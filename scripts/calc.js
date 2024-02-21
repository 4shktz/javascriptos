function openCalculator() {
  const calculator = document.getElementById("calculator");
  calculator.style.display = "block";

  $(calculator).draggable();
}

function appendToDisplay(value) {
  const calcDisplay = document.getElementById("calcDisplay");
  calcDisplay.value += value;
}

function clearDisplay() {
  const calcDisplay = document.getElementById("calcDisplay");
  calcDisplay.value = "";
}

function calculate() {
  const calcDisplay = document.getElementById("calcDisplay");

  try {
    calcDisplay.value = eval(calcDisplay.value);
  } catch (error) {
    calcDisplay.value = "Error";
    console.log("Error evaluating expression: " + error.message);
  }
}