import {validarUser} from "./components/login.js"
const btnEnviar = document.getElementById('enviar');
const email = document.getElementById('email');
const password = document.getElementById('password');
const sess = localStorage.getItem('user');



document.addEventListener("keyup", (e)=>{
    const key = "Enter";
    if(e.key === key){
       validarUser(email.value, password.value)
    }
})

btnEnviar.addEventListener('click', ()=>{
    validarUser(email.value, password.value)
})
