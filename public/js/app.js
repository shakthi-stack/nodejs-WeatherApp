console.log('Client side javascript file is loaded!')


// fetch('http://localhost:3000/weather?address=Boston').then(
//     (res)=>{
//         res.json().then((data)=>{
//             if(data.error){
//                 return console.log(data.error);
//             }
//             console.log(data.location);
//             console.log(data.Weather);
//         })
//     }
// )
const form = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelector("#message");
// const messageTwo = document.querySelector("#message2");


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    // console.log(location);
    // messageOne.textContent = "";
    // messageTwo.textContent = "";

    fetch(`/weather?address=${location}`).then(
    (res)=>{
        res.json().then((data)=>{
            if(data.error){
                message.innerHTML = `<p>${data.error}</p>`;
                // messageOne.textContent = data.error;
                // return console.log(data.error);
            }
            // messageOne.textContent = data.location;
            // messageTwo.textContent = data.Weather;
            message.innerHTML = `<p>${data.location}</p> <p>${data.Weather}</p>`;
            // message.innerHTML = `<p>${data.error}</p>`;
            // console.log(data.location);
            // console.log(data.Weather);
        })
    }
)


})