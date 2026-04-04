let array = [];
let speed = 50;

document.getElementById("speedSlider").addEventListener("input", function () {
  speed = this.value;
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateArray() {
  array = [];
  let container = document.getElementById("array");
  container.innerHTML = "";

  for (let i = 0; i < 50; i++) {
    let value = Math.floor(Math.random() * 300) + 20;
    array.push(value);

    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value + "px";

    container.appendChild(bar);
  }
}

async function bubbleSort() {
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
}

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

  return i + 1;
}

async function quickSortStart() {
  await quickSort(array, 0, array.length - 1);
}
