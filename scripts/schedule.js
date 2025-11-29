const table_body = document.querySelector('tbody')

const parties = JSON.parse(localStorage.getItem("parties") || "[]");

const cell_data = data => {
    const td = document.createElement("td")
    td.textContent = data
    return td
}


parties.forEach((obj) => {
    const tr = document.createElement('tr')
    Object.keys(obj).forEach((key) => {
        const value = key === "episode" ? `EP ${obj[key]}` : obj[key]
        tr.appendChild(cell_data(value))
    }) 

    table_body.appendChild(tr);
})