const table_body = document.querySelector('tbody')

const parties = JSON.parse(localStorage.getItem("parties") || "[]");

const cell_data = data => {
    const td = document.createElement("td")
    td.textContent = data
    return td
}

parties.forEach((obj) => {
    const table_row = document.createElement('tr')
    console.log(obj)
    table_row.appendChild(cell_data(obj.selection))    
    table_row.appendChild(cell_data(`EP ${obj.episode}`))    
    table_row.appendChild(cell_data(obj.date))    
    table_row.appendChild(cell_data(obj.time))    
    table_row.appendChild(cell_data(obj.name))    


    table_body.appendChild(table_row);
})