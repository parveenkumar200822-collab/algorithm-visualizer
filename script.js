let arr = [];
let delay = 150;

// sleep function
function sleep(ms){
  return new Promise(r => setTimeout(r, ms));
}

// 🔥 FINAL FIXED SCALING
function updateBars(){
  let container = document.getElementById("array");
  container.innerHTML = "";

  if(arr.length === 0) return;

  let maxVal = Math.max(...arr);
  let containerHeight = 350;

  for(let i = 0; i < arr.length; i++){
    let bar = document.createElement("div");
    bar.classList.add("bar");

    let height = Math.floor((arr[i] / maxVal) * containerHeight);

    if(height > containerHeight) height = containerHeight;

    bar.style.height = height + "px";
    bar.innerText = arr[i];

    container.appendChild(bar);
  }
}

// generate random
function generate(){
  arr = [];
  for(let i=0;i<25;i++){
    arr.push(Math.floor(Math.random()*100)+10);
  }
  updateBars();
}

// manual input
function useInput(){
  let input = document.getElementById("manualInput").value;

  arr = input.split(",")
             .map(x => parseInt(x))
             .filter(x => !isNaN(x));

  updateBars();
}

// bubble sort
async function bubbleSort(){

  let start = Date.now();
  let bars = document.getElementsByClassName("bar");

  for(let i=0;i<arr.length;i++){

    for(let j=0;j<arr.length-i-1;j++){

      document.getElementById("status").innerText =
        "Comparing: " + arr[j] + " vs " + arr[j+1];

      bars[j].style.background = "yellow";
      bars[j+1].style.background = "yellow";

      await sleep(delay);

      if(arr[j] > arr[j+1]){

        document.getElementById("status").innerText =
          "Swapping: " + arr[j] + " ↔ " + arr[j+1];

        bars[j].style.background = "red";
        bars[j+1].style.background = "red";

        await sleep(delay);

        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;

        updateBars();
        bars = document.getElementsByClassName("bar");
      }

      bars[j].style.background = "cyan";
      bars[j+1].style.background = "cyan";
    }

    bars[arr.length-i-1].style.background = "green";
  }

  let end = Date.now();

  document.getElementById("timer").innerText =
    "Time: " + (end - start) + " ms";

  document.getElementById("status").innerText =
    "✅ Sorting Completed";
}
