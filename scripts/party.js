// toString -> Thu Nov 27 2025 16:58:48 GMT+0000 (Coordinated Universal Time)
// toISOString -> 2025-11-27T16:59:01.499Z
// https://www.w3schools.com/tags/att_input_min.asp
// https://www.w3schools.com/jsref/jsref_toisostring.asp

// requestAnimationFrame https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/requestAnimationFrame
// toLocaleDateString https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString



// Local Storage
let parties = JSON.parse(localStorage.getItem("parties") || "[]");
console.log(parties)


// Elements
const modal = document.querySelector("#myModal")
const button = document.querySelector('#modal_button')
const close = document.querySelector(".close")
const modal_content = document.querySelector(".modal-content")

const form = document.querySelector('form')
const episode = document.querySelector('input[type="number"]');
const date = document.querySelector('input[type="date"]')
const name = document.querySelector('input[type="text"]')
const time = document.querySelector('input[type="time"]')
const selection = document.querySelector('select')



// form


form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    // creates ISO datetime eg: 2025-11-28T05:10
    const eventDate = new Date(`${date.value}T${time.value}`);
    
    dateObj = {
        date: eventDate.toLocaleDateString("en-us", {month : "short", day : "numeric"}),
        time: eventDate.toLocaleDateString("en-us", {hour: "numeric", minute: "2-digit"}).split(", ")[1]
    }
    
    const obj = {
        name : name.value,
        selection : selection.value,
        episode : episode.value,
        ...dateObj // spread dateObj to current Obj
    }
    
    name.value = ""
    date.value = ""
    episode.value = ""
    time.value = ""
    selection.value = ""

    const element = document.createElement("p")
    element.textContent = "Form submitted sucessfully"
    modal_content.appendChild(element)

    modal.style.display = "block"
    modal_content.style.top = 0
    requestAnimationFrame(() =>  modal_content.style.top = "50%")

    parties.push(obj);

    localStorage.setItem("parties", JSON.stringify(parties));

    console.log(obj)
})

// can't choose dates before today
const today = new Date().toISOString().split("T")[0];
date.setAttribute("min", today);

// removes filler characters in num input
episode.addEventListener("keydown", (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
});




// Modal

const party_list = data => {
    const el = document.createElement("li")
    el.textContent = data
    return el
}

button.addEventListener("click", () => {
    const ulEl = document.createElement('ul')
    ulEl.appendChild(party_list("Lorem"))
    ulEl.appendChild(party_list("Lorem, ipsum dolor."))
    ulEl.appendChild(party_list("Lorem ipsum dolor sit amet"))
    ulEl.appendChild(party_list("Lorem, ipsum"))
    ulEl.appendChild(party_list("Lorem ipsum dolor sit"))
    modal_content.appendChild(ulEl)

    modal.style.display = "block"
    modal_content.style.top = 0
    requestAnimationFrame(() =>  modal_content.style.top = "50%")
})

close.addEventListener("click", () => {
    modal_content.style.top = 0
    modal_content.addEventListener("transitionend", () => {
        modal.style.display = "none"
        document.querySelector("ul") ? modal_content.removeChild(document.querySelector('ul')) : modal_content.removeChild(document.querySelector('p'))
    }, {once: true})
})

window.addEventListener("click", (e) => {
    if (e.target == modal && modal.style.display === "block"){
        modal_content.style.top = 0
        modal.style.display = "none"
        document.querySelector("ul") ? modal_content.removeChild(document.querySelector('ul')) : modal_content.removeChild(document.querySelector('p'))
    } 
})

