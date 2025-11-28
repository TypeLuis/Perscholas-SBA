const adding = (a,b) => {
    return a + b
}

console.log(adding(13,5) + adding(2,5))
const subtracting = (a,b) => a-b
console.log(adding(13,5) + subtracting(7,5))


const heading = document.querySelector('h1')
let user = localStorage.getItem('user')

if (user){
    user = JSON.parse(user)
    heading.textContent = `Welcome to the party ${user.name}!`
}



const form = document.querySelector("form")
form.addEventListener("submit", (e)=> {
    e.preventDefault()

    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;

    const user = {
        name: name,
        email: email
    };

    localStorage.setItem("user", JSON.stringify(user));

    heading.textContent = `Welcome to the party ${user.name}!`
})

