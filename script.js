let arr = [];
let delay = 100;

// 🎲 Generate random array
function generateRandom() {
    arr = [];
    for (let i = 0; i < 50; i++) {
        arr.push(Math.floor(Math.random() * 100) + 5); // values 5–105
    }
    drawBars();
}

// 🧾 Take manual input
function useInput() {
    let input = document.getElementById("inputArray").value;
    arr = input.split(",").map(Number);
    drawBars();
}

// 🎨 Draw bars (FIXED SCALING)
function drawBars(highlight = [], sorted = []) {
    const container = document.getElementById("array-container");
    container.innerHTML = "";

    let maxVal = Math.max(...arr, 100); // 🔥 FIX: scaling issue

    arr.forEach((value, index) => {
        let bar = document.createElement("div");
        bar.classList.add("bar");

        // 🔥 FIX: scale height properly
        bar.style.height = (value / maxVal) * 300 + "px";

        // Colors
        if (sorted.includes(index)) {
            bar.style.background = "green";
        } else if (highlight.includes(index)) {
            bar.style.background = "yellow";
        } else {
            bar.style.background = "cyan";
        }

        // Optional value label
        bar.innerText = value;

        container.appendChild(bar);
    });
}

// ⏳ Sleep (for animation)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 🔥 Bubble Sort (FINAL)
async function bubbleSort() {
    let start = Date.now();

    let n = arr.length;
    let sorted = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {

            drawBars([j, j + 1], sorted);
            await sleep(delay);

            if (arr[j] > arr[j + 1]) {
                // swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                drawBars([j, j + 1], sorted);
                await sleep(delay);
            }
        }

        // mark sorted
        sorted.push(n - i - 1);
    }

    // 🔥 FINAL: ALL GREEN
    drawBars([], [...Array(n).keys()]);

    let end = Date.now();

    document.getElementById("status").innerText = "✅ Sorting Completed";
    document.getElementById("timer").innerText =
        "Time: " + (end - start) + " ms";
}

// 🎚 Speed control
function changeSpeed(value) {
    delay = 200 - value;
}
