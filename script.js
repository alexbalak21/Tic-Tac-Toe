const gridTable = document.getElementById("grid")
const playButton = document.getElementById("play")
playButton.addEventListener("click", play)

let first = true
let symbol = Math.random() < 0.5 ? "X" : "O"
let turn = 0

const grid = new Array(3)
for (let i = 0; i < 3; i++) grid[i] = new Array(3)
const avalableCells = []

for (let y = 0; y < 3; y++) {
    const tr = document.createElement("tr")
    for (let x = 0; x < 3; x++) {
        const td = document.createElement("td")
        tr.appendChild(td)
        grid[y][x] = td
        td.addEventListener("click", takeCell)
        avalableCells.push(td)
    }
    gridTable.appendChild(tr)
}

if (symbol === "O") computerPlay()

function takeCell() {
    let win = false
    if (this.innerText !== "") return
    this.innerText = symbol
    const cellIndex = avalableCells.indexOf(this)
    this.removeEventListener("click", takeCell)
    avalableCells.splice(cellIndex, 1)
    turn++
    if (turn >= 5) win = checkForWin()
    if (win) {
        for (let cell of avalableCells) cell.removeEventListener("click", takeCell)
        return console.log("WINNER ", symbol)
    }
    if (symbol === "X") {
        symbol = "O"
        computerPlay()
    } else symbol = "X"
}

function randInteger(min = 0, max = 10) {
    return Math.floor(Math.random() * (max - min)) + min
}

function computerPlay() {
    const index = randInteger(0, avalableCells.length - 1)
    avalableCells[index].click()
}

function checkForWin() {
    let win = false
    for (let line = 0; line < 3; line++) if (checkLine(line)) return true
    for (let column = 0; column < 3; column++) if (checkColumn(column)) return true
    if (checkDiags()) return true
    return win
}

function checkLine(y) {
    let points = 0
    for (let x = 0; x < 3; x++) points += grid[y][x].innerText === symbol ? 1 : 0
    return points === 3
}

function checkColumn(x) {
    let points = 0
    for (let y = 0; y < 3; y++) points += grid[y][x].innerText === symbol ? 1 : 0
    return points === 3
}

function checkDiags() {
    let points = 0
    for (let i = 0; i < 3; i++) points += grid[i][i].innerText === symbol ? 1 : 0
    if (points === 3) return true

    points = 0
    for (let j = 0; j >= 0; j--) points += grid[j][j].innerText === symbol ? 1 : 0
    return points === 3
}
