import { log, randInteger } from "./utils.js"
import { grid, availableCells, symbol, turn, checkLine, checkColumn, checkDiag } from "./board.js"
import { takeCell } from "./board.js"

export function computerPlay() {
    log("AI — computerPlay() called, AI symbol =", symbol, "turn =", turn)

    if (turn === 0) return grid[1][1].click()
    if (turn === 1) {
        if (grid[1][1].innerText !== "") return playCorner()
        return grid[1][1].click()
    }

    if (tryWin(symbol)) return
    if (tryBlock("X")) return

    randomMove()
}

export function tryWin(ai) {
    log("AI — tryWin() START")

    for (let y = 0; y < 3; y++) {
        if (checkLine(y, ai) === 2 && rowHasEmpty(y)) return fillLine(y)
    }

    for (let x = 0; x < 3; x++) {
        if (checkColumn(x, ai) === 2 && columnHasEmpty(x)) return fillColumn(x)
    }

    if (checkDiag(0, ai) === 2 && diagHasEmpty(0)) return fillDiag(0)
    if (checkDiag(2, ai) === 2 && diagHasEmpty(2)) return fillDiag(2)

    return false
}

export function tryBlock(player) {
    log("AI — tryBlock() START")

    for (let y = 0; y < 3; y++) {
        if (checkLine(y, player) === 2 && rowHasEmpty(y)) return fillLine(y)
    }

    for (let x = 0; x < 3; x++) {
        if (checkColumn(x, player) === 2 && columnHasEmpty(x)) return fillColumn(x)
    }

    if (checkDiag(0, player) === 2 && diagHasEmpty(0)) return fillDiag(0)
    if (checkDiag(2, player) === 2 && diagHasEmpty(2)) return fillDiag(2)

    return false
}

export function fillLine(y) {
    for (let x = 0; x < 3; x++) {
        if (grid[y][x].innerText === "") return grid[y][x].click()
    }
}

export function fillColumn(x) {
    for (let y = 0; y < 3; y++) {
        if (grid[y][x].innerText === "") return grid[y][x].click()
    }
}

export function fillDiag(start) {
    if (start === 0) {
        for (let i = 0; i < 3; i++)
            if (grid[i][i].innerText === "") return grid[i][i].click()
    } else {
        for (let i = 0; i < 3; i++)
            if (grid[i][2 - i].innerText === "") return grid[i][2 - i].click()
    }
}

export function randomMove() {
    const index = randInteger(0, availableCells.length)
    availableCells[index].click()
}

export function playCorner() {
    const corners = [[0,0],[0,2],[2,2],[2,0]]
    const [y,x] = corners[randInteger(0,4)]
    if (grid[y][x].innerText === "") return grid[y][x].click()
    randomMove()
}

export function rowHasEmpty(y) {
    return grid[y].some(c => c.innerText === "")
}

export function columnHasEmpty(x) {
    return grid.some(row => row[x].innerText === "")
}

export function diagHasEmpty(start) {
    if (start === 0) return [0,1,2].some(i => grid[i][i].innerText === "")
    return [0,1,2].some(i => grid[i][2-i].innerText === "")
}
