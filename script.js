const display = document.getElementById("grid")

const grid = new Array(3)
for (let i = 0; i < 3; i++) grid[i] = new Array(3)

for (let y = 0; y < 3; y++) {
    const tr = document.createElement("tr")
    for (let x = 0; x < 3; x++) {
        const td = document.createElement("td")
        tr.appendChild(td)
        grid[y][x] = td
    }
    display.appendChild(tr)
}
