const grind = document.getElementById("grid")

for (let i = 0; i < 3; i++) {
    const tr = document.createElement("tr")
    for (let j = 0; j < 3; j++) {
        const td = document.createElement("td")
        tr.appendChild(td)
    }
    grind.appendChild(tr)
}
