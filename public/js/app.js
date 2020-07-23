// // header java script starts here... 
// function myFunction() {
//   var x = document.getElementById("myTopnav");
//   if (x.className === "topnav") {
//     x.className += " responsive";
//   } 
//   else {
//     x.className = "topnav";
//   }
// }
console.log('yaaaaaaaaaaas')


const form = document.querySelector('form')
const search = document.querySelector('input')
const p0 = document.querySelector('#p0')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')


form.addEventListener('change', (event) => {
    event.preventDefault()

    const location = search.value

    p0.textContent = 'Loading...'
    p1.textContent = ''
    p2.textContent = ''

    //fetching data from the url...
    fetch('/weather?search=' + location).then((response) =>{
        response.json().then((data) => {
            if(data.error){
                p0.textContent = data.error
            }
            else{
                p0.textContent = 'City = ' +  data.city 
                p1.textContent = 'temperature = ' +  data.temp_min + '°C ' + ' - ' + data.temp_max + '°C'
                p2.textContent = 'Weather status = ' + data.weather
            }           
        })
    })
})