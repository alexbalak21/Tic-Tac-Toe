const gridTable = document.getElementById("grid")
const playButton = document.getElementById("play")
playButton.addEventListener("click", play)

let symbol = Math.random() < 0.5 ? "X" : "O"
let turn = 0

console.log("INIT — Starting symbol =", symbol)

const grid = new Array(3)
for (let i = 0; i < 3; i++) grid[i] = new Array(3)

const avalableCells = []


// Build The grid
for (let y = 0; y < 3; y++) {
    const tr = document.createElement("tr")
    for (let x = 0; x < 3; x++) {
        const td = document.createElement("td")
        td.dataset.x = x
        td.dataset.y = y
        tr.appendChild(td)
        grid[y][x] = td
        td.addEventListener("click", takeCell)
        avalableCells.push(td)
    }
    gridTable.appendChild(tr)
}

if (symbol === "O") {
    console.log("INIT — Computer starts")
    computerPlay()
}

function play() {
    console.log("RELOAD — Restarting game")
    location.reload()
}

function takeCell() {
    console.log("CLICK — Player clicked cell containing:", this.innerText)

    if (this.innerText !== "") {
        console.log("CLICK — Cell already filled, ignoring")
        return
    }

    console.log("CLICK — Writing symbol:", symbol)
    this.innerText = symbol

    const cellIndex = avalableCells.indexOf(this)
    console.log("CLICK — Removing cell from available list, index:", cellIndex)
    this.removeEventListener("click", takeCell)
    avalableCells.splice(cellIndex, 1)

    turn++
    console.log("TURN =", turn)

    let win = false
    if (turn >= 5) {
        console.log("CHECK — Checking for win for symbol:", symbol)
        win = checkForWin(symbol)
    }

    if (win) {
        console.log("WIN — Winner detected:", symbol)
        for (let cell of avalableCells) cell.removeEventListener("click", takeCell)
        return
    }

    if (symbol === "X") {
        console.log("SWITCH — Player was X, now AI plays O")
        symbol = "O"
        computerPlay()
    } else {
        console.log("SWITCH — Player was O, now X")
        symbol = "X"
    }
}

function randInteger(min = 0, max = 10) {
    const r = Math.floor(Math.random() * (max - min)) + min
    console.log("RAND — Generated random integer:", r)
    return r
}

function computerPlay() {
    const ai = symbol
    console.log("AI — computerPlay() called, AI symbol =", ai, "turn =", turn)

    if (turn === 0) {
        console.log("AI — Turn 0, taking center")
        grid[1][1].click()
        return
    }

    if (turn === 1) {
        console.log("AI — Turn 1 logic")
        if (grid[1][1].innerText !== "") {
            console.log("AI — Player took center, playing corner")
            playCorner()
        } else {
            console.log("AI — Center free, taking center")
            grid[1][1].click()
        }
        return
    }

    console.log("AI — Turn >= 2, prioritising 2-point lines")
    prioritise2Points(ai)
}

function prioritise2Points(ai) {
    console.log("AI — prioritise2Points() START, ai =", ai)

    if (turn < 3) {
        console.log("AI — Turn < 3, random move")
        randomMove()
        return
    }

    console.log("AI — Checking rows")
    for (let y = 0; y < 3; y++) {
        const pts = checkLine(y, ai)
        console.log("AI — Row", y, "points =", pts)
        if (pts === 2) {
            console.log("AI — Found 2 in row", y)
            fillLine(y)
            return
        }
    }

    console.log("AI — Checking columns")
    for (let x = 0; x < 3; x++) {
        const pts = checkColumn(x, ai)
        console.log("AI — Column", x, "points =", pts)
        if (pts === 2) {
            console.log("AI — Found 2 in column", x)
            fillColumn(x)
            return
        }
    }

    console.log("AI — Checking diagonals")
    let pts = checkDiags(0, ai)
    console.log("AI — Diagonal 0 points =", pts)
    if (pts === 2) {
        console.log("AI — Found 2 in diag 0")
        fillDiag(0)
        return
    }

    pts = checkDiags(2, ai)
    console.log("AI — Diagonal 2 points =", pts)
    if (pts === 2) {
        console.log("AI — Found 2 in diag 2")
        fillDiag(2)
        return
    }

    console.log("AI — No 2-point line found, random move")
    randomMove()
}

function fillLine(y) {
    console.log("AI — fillLine", y)
    for (let x = 0; x < 3; x++) {
        console.log("AI — Checking row", y, "col", x, "value =", grid[y][x].innerText)
        if (grid[y][x].innerText === "") {
            console.log("AI — Playing at", y, x)
            grid[y][x].click()
            return
        }
    }
}

function fillColumn(x) {
    console.log("AI — fillColumn", x)
    for (let y = 0; y < 3; y++) {
        console.log("AI — Checking col", x, "row", y, "value =", grid[y][x].innerText)
        if (grid[y][x].innerText === "") {
            console.log("AI — Playing at", y, x)
            grid[y][x].click()
            return
        }
    }
}

function fillDiag(start) {
    console.log("AI — fillDiag", start)
    if (start === 0) {
        for (let i = 0; i < 3; i++) {
            console.log("AI — Checking diag0 cell", i, i, "value =", grid[i][i].innerText)
            if (grid[i][i].innerText === "") {
                console.log("AI — Playing at", i, i)
                grid[i][i].click()
                return
            }
        }
    } else {
        for (let i = 0; i < 3; i++) {
            console.log("AI — Checking diag2 cell", i, 2 - i, "value =", grid[i][2 - i].innerText)
            if (grid[i][2 - i].innerText === "") {
                console.log("AI — Playing at", i, 2 - i)
                grid[i][2 - i].click()
                return
            }
        }
    }
}

function randomMove() {
    console.log("AI — randomMove() called")
    if (avalableCells.length === 0) {
        console.log("AI — No available cells")
        return
    }
    const index = randInteger(0, avalableCells.length)
    console.log("AI — Random index chosen:", index)
    avalableCells[index].click()
}

function playCorner() {
    console.log("AI — playCorner()")
    const corners = [
        [0, 0],
        [0, 2],
        [2, 2],
        [2, 0],
    ]
    const corner = corners[randInteger(0, 4)]
    console.log("AI — Corner chosen:", corner)
    const cell = grid[corner[0]][corner[1]]
    if (cell.innerText === "") {
        console.log("AI — Corner empty, playing")
        cell.click()
    } else {
        console.log("AI — Corner filled, fallback random")
        randomMove()
    }
}

function checkForWin(playerSymbol) {
    console.log("CHECK WIN — Checking for symbol:", playerSymbol)

    for (let line = 0; line < 3; line++) {
        const pts = checkLine(line, playerSymbol)
        console.log("CHECK WIN — Row", line, "points =", pts)
        if (pts === 3) return true
    }

    for (let column = 0; column < 3; column++) {
        const pts = checkColumn(column, playerSymbol)
        console.log("CHECK WIN — Column", column, "points =", pts)
        if (pts === 3) return true
    }

    let pts = checkDiags(0, playerSymbol)
    console.log("CHECK WIN — Diag 0 points =", pts)
    if (pts === 3) return true

    pts = checkDiags(2, playerSymbol)
    console.log("CHECK WIN — Diag 2 points =", pts)
    if (pts === 3) return true

    return false
}

function checkLine(y, playerSymbol) {
    console.log("CHECK LINE — y =", y, "symbol =", playerSymbol)
    let points = 0
    for (let x = 0; x < 3; x++) {
        const cell = grid[y][x].innerText
        const match = cell === playerSymbol
        console.log("CHECK LINE — y", y, "x", x, "cell =", cell, "match =", match)
        if (match) points++
    }
    console.log("CHECK LINE — y", y, "TOTAL =", points)
    return points
}

function checkColumn(x, playerSymbol) {
    console.log("CHECK COLUMN — x =", x, "symbol =", playerSymbol)
    let points = 0
    for (let y = 0; y < 3; y++) {
        const cell = grid[y][x].innerText
        const match = cell === playerSymbol
        console.log("CHECK COLUMN — x", x, "y", y, "cell =", cell, "match =", match)
        if (match) points++
    }
    console.log("CHECK COLUMN — x", x, "TOTAL =", points)
    return points
}

function checkDiags(start, playerSymbol) {
    console.log("CHECK DIAG — start =", start, "symbol =", playerSymbol)
    let points = 0

    if (start === 0) {
        for (let i = 0; i < 3; i++) {
            const cell = grid[i][i].innerText
            const match = cell === playerSymbol
            console.log("CHECK DIAG0 — i", i, "cell =", cell, "match =", match)
            if (match) points++
        }
    } else {
        for (let i = 0; i < 3; i++) {
            const cell = grid[i][2 - i].innerText
            const match = cell === playerSymbol
            console.log("CHECK DIAG2 — i", i, "cell =", cell, "match =", match)
            if (match) points++
        }
    }

    console.log("CHECK DIAG — start", start, "TOTAL =", points)
    return points
}
