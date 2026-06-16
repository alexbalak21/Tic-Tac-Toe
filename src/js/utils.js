export function randInteger(min = 0, max = 10) {
    const r = Math.floor(Math.random() * (max - min)) + min
    console.log("RAND — Generated random integer:", r)
    return r
}

export function log(...args) {
    console.log(...args)
}
