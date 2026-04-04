let array = [];
let speed = 50;

// Step mode (leave as it is)
let stepMode = false;
let stepResolve;

function waitStep() {
  return new Promise(resolve => {
    stepResolve = resolve;
  });
}

function toggleStep() {
  stepMode = !stepMode;
  alert("Step Mode: " + (stepMode ? "ON" : "OFF"));
}

document.addEventListener("keydown", () => {
  if (stepMode && stepResolve) {
    stepResolve();
    stepResolve = null;
  }
});

// Speed control
document.getElementById("speedSlider").addEventListener("input", function () {
  speed = this.value;
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate array
function generateArray() {
  array = [];
  let container = document.getElementById("array");
  container.innerHTML = "";

  for (let i = 0; i < 60; i++) {
    let value = Math.floor(Math.random() * 300) + 20;
    array.push(value);

    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value + "px";

    container.appendChild(bar);
  }
}

// 🔥 BUBBLE SORT WITH TIMER
async function bubbleSort() {

  let start = Date.now(); // ⏱ start time

  let bars = document.querySelectorAll(".bar");

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {

      bars[j].style.background = "yellow";
      bars[j + 1].style.background = "yellow";

      await sleep(speed);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        bars[j].style.height = array[j] + "px";
        bars[j + 1].style.height = array[j + 1] + "px";
      }

      bars[j].style.background = "cyan";
      bars[j + 1].style.background = "cyan";
    }

    bars[array.length - i - 1].style.background = "green";
  }

  let end = Date.now(); // ⏱ end time

  document.getElementById("timer").innerText =
    "Time Taken: " + (end - start) + " ms";
}

// Quick Sort (same as before)
async function quickSort(arr, low, high) {
  if (low < high) {
    let pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
}

async function partition(arr, low, high) {
  let bars = document.querySelectorAll(".bar");
  let pivot = arr[high];
  let i = low - 1;

  bars[high].style.background = "red";

  for (let j = low; j < high; j++) {
    bars[j].style.background = "yellow";

    await sleep(speed);

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];

      bars[i].style.height = arr[i] + "px";
      bars[j].style.height = arr[j] + "px";
    }

    bars[j].style.background = "cyan";
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  bars[i + 1].style.height = arr[i + 1] + "px";
  bars[high].style.height = arr[high] + "px";

  bars[high].style.background = "cyan";
  bars[i + 1].style.background = "green";

  return i + 1;
}

async function quickSortStart() {
  await quickSort(array, 0, array.length - 1);
}