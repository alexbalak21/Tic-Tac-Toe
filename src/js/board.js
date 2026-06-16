import { log } from "./utils.js"
import { computerPlay } from "./ai.js"

export let symbol = Math.random() < 0.5 ? "X" : "O"
export let turn = 0
export const grid = Array.from({ length: 3 }, () => Array(3))
export const availableCells = []

export function initBoard() {
    log("INIT — Starting symbol =", symbol)

    const gridTable = document.getElementById("grid")

    for (let y = 0; y < 3; y++) {
        const tr = document.createElement("tr")
        for (let x = 0; x < 3; x++) {
            const td = document.createElement("td")
            td.dataset.x = x
            td.dataset.y = y
            td.addEventListener("click", takeCell)
            tr.appendChild(td)
            grid[y][x] = td
            availableCells.push(td)
        }
        gridTable.appendChild(tr)
    }

    if (symbol === "O") {
        log("INIT — Computer starts")
        computerPlay()
    }
}

export function takeCell() {
    log("CLICK — Player clicked cell containing:", this.innerText)

    if (this.innerText !== "") {
        log("CLICK — Cell already filled, ignoring")
        return
    }

    log("CLICK — Writing symbol:", symbol)
    this.innerText = symbol

    const index = availableCells.indexOf(this)
    availableCells.splice(index, 1)
    this.removeEventListener("click", takeCell)

    turn++
    log("TURN =", turn)

    if (turn >= 5 && checkForWin(symbol)) {
        log("WIN — Winner detected:", symbol)
        for (let c of availableCells) c.removeEventListener("click", takeCell)
        return
    }

    if (symbol === "X") {
        symbol = "O"
        computerPlay()
    } else {
        symbol = "X"
    }
}

export function checkForWin(playerSymbol) {
    log("CHECK WIN — Checking for symbol:", playerSymbol)

    for (let y = 0; y < 3; y++) {
        if (checkLine(y, playerSymbol) === 3) return true
    }

    for (let x = 0; x < 3; x++) {
        if (checkColumn(x, playerSymbol) === 3) return true
    }

    if (checkDiag(0, playerSymbol) === 3) return true
    if (checkDiag(2, playerSymbol) === 3) return true

    return false
}

export function checkLine(y, s) {
    let pts = 0
    for (let x = 0; x < 3; x++) {
        const cell = grid[y][x].innerText
        log("CHECK LINE — y", y, "x", x, "cell =", cell, "match =", cell === s)
        if (cell === s) pts++
    }
    log("CHECK LINE — y", y, "TOTAL =", pts)
    return pts
}

export function checkColumn(x, s) {
    let pts = 0
    for (let y = 0; y < 3; y++) {
        const cell = grid[y][x].innerText
        log("CHECK COLUMN — x", x, "y", y, "cell =", cell, "match =", cell === s)
        if (cell === s) pts++
    }
    log("CHECK COLUMN — x", x, "TOTAL =", pts)
    return pts
}

export function checkDiag(start, s) {
    let pts = 0
    if (start === 0) {
        for (let i = 0; i < 3; i++) {
            const cell = grid[i][i].innerText
            log("CHECK DIAG0 — i", i, "cell =", cell, "match =", cell === s)
            if (cell === s) pts++
        }
    } else {
        for (let i = 0; i < 3; i++) {
            const cell = grid[i][2 - i].innerText
            log("CHECK DIAG2 — i", i, "cell =", cell, "match =", cell === s)
            if (cell === s) pts++
        }
    }
    log("CHECK DIAG — start", start, "TOTAL =", pts)
    return pts
}
