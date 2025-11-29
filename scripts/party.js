// toString -> Thu Nov 27 2025 16:58:48 GMT+0000 (Coordinated Universal Time)
// toISOString -> 2025-11-27T16:59:01.499Z
// https://www.w3schools.com/tags/att_input_min.asp
// https://www.w3schools.com/jsref/jsref_toisostring.asp

// requestAnimationFrame https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/requestAnimationFrame
// toLocaleDateString https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString



// Local Storage
let parties = JSON.parse(localStorage.getItem("parties") || "[]");


const elements = {
    "modal" : document.querySelector("#myModal"),
    button : document.querySelector('#modal_button'),
    close : document.querySelector(".close"),
    "modal_content" : document.querySelector(".modal-content"),
    form : document.querySelector('form'),
    formEl : {
        selection : document.querySelector('select'),
        episode : document.querySelector('input[type="number"]'),
        date : document.querySelector('input[type="date"]'),
        time : document.querySelector('input[type="time"]'),
        name : document.querySelector('input[type="text"]')
    }
}



// form


elements.form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    // creates ISO datetime eg: 2025-11-28T05:10
    const eventDate = new Date(`${elements.formEl.date.value}T${elements.formEl.time.value}`);
    
    // _store isn't an actual key in the element node, I created it to have a place to store the value.
    // elements.formEl.date._store = eventDate.toLocaleDateString("en-us", {month : "short", day : "numeric"})
    // elements.formEl.time._store = eventDate.toLocaleDateString("en-us", {hour: "numeric", minute: "2-digit"}).split(", ")[1]
    
    const formatted = {
        date: eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        time: eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      };
    
    const copyObj = {}

    Object.keys(elements.formEl).forEach((key) =>{
        copyObj[key] = key in formatted ? formatted[key] : elements.formEl[key].value
        elements.formEl[key].value = ""
    })

    const message = document.createElement("p")
    message.textContent = "Form submitted sucessfully"
    elements.modal_content.appendChild(message)

    elements.modal.style.display = "block"
    elements.modal_content.style.top = 0
    requestAnimationFrame(() => elements.modal_content.style.top = "50%")

    parties.push(copyObj);

    localStorage.setItem("parties", JSON.stringify(parties));
})

// can't choose dates before today
const today = new Date().toISOString().split("T")[0];
elements.formEl.date.setAttribute("min", today);

// removes filler characters in num input
elements.formEl.episode.addEventListener("keydown", (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
});




// Modal

const party_list = data => {
    const el = document.createElement("li")
    el.textContent = data
    return el
}

elements.button.addEventListener("click", () => {
    const ulEl = document.createElement('ul')
    for (let i = 0; i < 5; i++) ulEl.appendChild(party_list(`lorem${i + 1}`))
    
    elements.modal_content.appendChild(ulEl)

    elements.modal.style.display = "block"
    elements.modal_content.style.top = 0
    requestAnimationFrame(() =>  elements.modal_content.style.top = "50%")
})

elements.close.addEventListener("click", () => {
    elements.modal_content.style.top = 0
    elements.modal_content.addEventListener("transitionend", () => {
        elements.modal.style.display = "none"
        document.querySelector("ul") ? elements.modal_content.removeChild(document.querySelector('ul')) : elements.modal_content.removeChild(document.querySelector('p'))
    }, {once: true})
})

window.addEventListener("click", (e) => {
    if (e.target == elements.modal && elements.modal.style.display === "block"){
        elements.modal_content.style.top = 0
        elements.modal.style.display = "none"
        document.querySelector("ul") ? elements.modal_content.removeChild(document.querySelector('ul')) : elements.modal_content.removeChild(document.querySelector('p'))
    } 
})

