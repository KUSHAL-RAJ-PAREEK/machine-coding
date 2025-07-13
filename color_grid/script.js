const grid = document.querySelector(".grid");
let griditem = null;
let filled = [];
let set = new Set();
let stack = [];
const softColors = [
    "#F08080",
    "#ddf8fcff",
    "#FFC1CC",
    "#C1F0DC",
    "#E6E6FA",
    "#FFDAB9",
    "#FFFACD",
    "#D8BFD8",
    "#FFF5E4",
    "#FADADD",
    "#D0F0C0",
    "#E0BBE4",
    "#BFD8D2",
    "#FFECB3",
    "#E3F2FD",
    "#F8C8DC"
];

(function make_grid() {
    for (let i = 0; i < 16; i++) {
        const div = document.createElement("div");
        div.classList.toggle("griditem");
        div.id = i;
        grid.appendChild(div)
        filled[i] = false;
    }
    griditem = document.querySelectorAll(".griditem");
})()


function clicked() {
    if (griditem != null) {
        griditem.forEach((e) => {
            e.addEventListener("click", () => {
                const id = e.id;
                if (filled[id]) {
                    e.style.backgroundColor = "#fff";
                    filled[id] = false;
                } else {
                    e.style.backgroundColor = softColors[id];
                    filled[id] = true;
                    stack.push({ id, e })
                }
            })
        })
    }
}
clicked()

function check() {
    for (let i = 0; i < 16; i++) {
        if (!filled[i]) {
            return false;
        }
    }
    return true;
}
let interval = setInterval(checkOverlay, 1000);
function checkOverlay() {

    if (check()) {
        clearInterval(interval);
        griditem.forEach((e) => {
            e.style.pointerEvents = "none"
        })
        stack.reverse();
        stack.forEach(({ id, e },i) => {
            if (!set.has(id)) {
                set.add(id);
                if (id == 15) {
                    setTimeout(() => {
                        e.style.backgroundColor = "#fff";
                        griditem.forEach((e) => {
                            e.style.pointerEvents = "auto"
                            interval = setInterval(checkOverlay, 1000);
                        })
                    }, ((i+1)*200))
                } else {
                   setTimeout(() => {
                        e.style.backgroundColor = "#fff";
                    }, ((i+1)*200))
                }

            }
        })
        stack = [];
        set = new Set();
        filled.fill(false);
    }

}
