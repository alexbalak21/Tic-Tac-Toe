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
    if (turn === 0) grid[1][1].click()
    if (turn === 1) {
        if (grid[1][1].innerText === "X") playCorner()
        else grid[1][1].click()
    } else {
        prioritise2Points()
        // avalableCells[index].click()
    }
}

function prioritise2Points() {
    console.log("----------------------prioritise2Points-------------")
    if (turn < 3) return
    console.log("TURN 3 OR MORE")
    let points = 0
    for (let y = 0; y < 3; y++) {
        points = checkLine(y)
        if (points === 2) {
            fillTheRemainingCell(y, 0)
            return
        }
        points = 0
        for (let x = 0; x < 3; x++) {
            points = checkColumn(x)
            if (points === 2) {
                fillTheRemainingCell(0, x)
                return
            }
        }
    }
}

function fillTheRemainingCell(y = 0, x = 0) {
    if (x === 0)
        for (x; x < 3; x++)
            if (grid[y][x].innerText === "") {
                console.log(grid[y][x])
                grid[y][x].click()
                break
            }
    if (y === 0)
        for (y; y < 3; y++)
            if (grid[y][x].innerText === "") {
                console.log(grid[y][x])
                grid[y][x].click()
                break
            }
}

function playCorner() {
    const corners = [
        [0, 0],
        [0, 2],
        [2, 2],
        [2, 0],
    ]
    const corner = corners[randInteger(0, 3)]
    grid[corner[0]][corner[1]].click()
}

function checkForWin() {
    let win = false
    for (let line = 0; line < 3; line++) if (checkLine(line) === 3) return true
    for (let column = 0; column < 3; column++) if (checkColumn(column) === 3) return true
    for (let x = 0; x <= 2; x += 2) if (checkDiags(x) === 3) return true
    return win
}

//NEED TO ADD SYMBOL TO THE function.
function checkLine(y) {
    let points = 0
    for (let x = 0; x < 3; x++) points += grid[y][x].innerText === symbol ? 1 : 0
    console.log("SYMBOL ", symbol, " LINE ", y, " POINTS ", points)
    return points
}

function checkColumn(x) {
    let points = 0
    for (let y = 0; y < 3; y++) points += grid[y][x].innerText === symbol ? 1 : 0
    console.log("SYMBOL ", symbol, "COLUM ", x, " - POINTS ", points)
    return points
}

function checkDiags(start) {
    let points = 0,
        y = -1,
        x = 3
    if (start === 0) for (let i = 0; i < 3; i++) points += grid[i][i].innerText === symbol ? 1 : 0
    if (points === 3) return 3
    else points = 0
    if (start === 2)
        for (let j = 0; j < 3; j++) {
            points += grid[(y += 1)][(x -= 1)].innerText === symbol ? 1 : 0
        }
    return points
}
