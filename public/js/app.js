//console.log('Client side js file is loaded')

// Vamos a usar la api Fetch. No es accesible desde node js, pero como aca estamos en "client side" sí podemos usarla

// fetch('https://puzzle.mead.io/puzzle').then((response) => { // el then viene de la api Promises
//     response.json().then((data) => { // esto corre cuando la data en json ya la consegui y ya la parsee
//         console.log(data)
//     })

// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => { // e de event
    e.preventDefault() // esto hace que cuando se corre el navegador no actualice al toque todo

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            
        })
    })
})