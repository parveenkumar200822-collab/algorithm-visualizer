function useManualInput() {
  let input = document.getElementById("manualInput").value;

  // Convert string → array
  let values = input.split(",").map(Number);

  array = [];
  let container = document.getElementById("array");
  container.innerHTML = "";

  for (let i = 0; i < values.length; i++) {
    let value = values[i];
    array.push(value);

    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value * 3 + "px"; // scale for visibility

    container.appendChild(bar);
  }
}
