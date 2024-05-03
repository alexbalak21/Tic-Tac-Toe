const gridTable = document.getElementById("grid")
const playButton = document.getElementById("play")
playButton.addEventListener("click", play)

const grid = new Array(3)
for (let i = 0; i < 3; i++) grid[i] = new Array(3)
const avalableCells = []

for (let y = 0; y < 3; y++) {
    const tr = document.createElement("tr")
    for (let x = 0; x < 3; x++) {
        const td = document.createElement("td")
        tr.appendChild(td)
        grid[y][x] = td
        avalableCells.push(td)
    }
    gridTable.appendChild(tr)
}

function play() {
    for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) grid[y][x].addEventListener("click", takeCell)
    console.log("PLAYING")
}

function takeCell() {
    if (this.innerText === "") {
        const cellIndex = avalableCells.indexOf(this)
        avalableCells.splice(cellIndex, 1)
        console.log(avalableCells)
        this.innerText = "X"
    } else console.log("NOT ALLOWED")
    let win = checkForWin()
    if (win !== "") return console.log(win)
    else copmputerPlay()
}

function rndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function copmputerPlay() {
    const cellIndex = rndInteger(0, avalableCells.length - 1)
    avalableCells[cellIndex].innerText = "O"
    avalableCells.splice(cellIndex, 1)
    let win = checkForWin()
    if (win !== "") return console.log(win)
    else play()
}

function checkForWin() {
    let win = 0
    for (let y = 0; y < 3; y++) {
        win = checkLine(y)
        if (win === 1) return "PLAYER X WINS"
        if (win === 2) return "PLAYER O WINS"
    }

    for (let x = 0; x < 3; x++) {
        win = checkColumn(x)
        if (win === 1) return "PLAYER X WINS"
        if (win === 2) return "PLAYER O WINS"
    }
    win = checkDiag()
    if (win === 1) return "PLAYER X WINS"
    if (win === 2) return "PLAYER O WINS"
    return ""
}

function checkLine(y) {
    let takenCellsX = 0
    let takenCellsO = 0
    for (let x = 0; x < 3; x++) {
        switch (grid[y][x].innerText) {
            case "X":
                takenCellsX++
                break
            case "X":
                takenCellsO++
                break
        }
    }
    if (takenCellsX === 3) return 1
    else if (takenCellsO === 3) return 2
    else return 0
}
function checkColumn(x) {
    let takenCellsX = 0
    let takenCellsO = 0
    for (let y = 0; y < 3; y++) {
        switch (grid[y][x].innerText) {
            case "X":
                takenCellsX++
                break
            case "X":
                takenCellsO++
                break
        }
    }
    if (takenCellsX === 3) return 1
    else if (takenCellsO === 3) return 2
    else return 0
}
function checkDiag() {
    let takenCellsX = 0
    let takenCellsO = 0
    for (let i = 0; i < 3; i++) {
        switch (grid[i][i].innerText) {
            case "X":
                takenCellsX++
                break
            case "X":
                takenCellsO++
                break
        }
    }
    if (takenCellsX === 3) return 1
    else if (takenCellsO === 3) return 2
    takenCellsX = 0
    takenCellsO = 0
    for (let j = 2; j >= 0; j--)
        switch (grid[j][j].innerText) {
            case "X":
                takenCellsX++
                break
            case "X":
                takenCellsO++
                break
        }
    if (takenCellsX === 3) return 1
    else if (takenCellsO === 3) return 2
    return 0
}
