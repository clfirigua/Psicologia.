import {validarUSer} from "./components/login.js"
import {getData} from "./services/crudservice.js";
import { redireccion } from "./components/redireccion.js"
const btnEnviar = document.getElementById('enviar');
const email = document.getElementById('email');
const password = document.getElementById('password');
const sess = localStorage.getItem('user');



document.addEventListener("keyup", (e)=>{
    const key = "Enter";
    if(e.key === key){
       validarUSer(email.value, password.value)
    }
})

btnEnviar.addEventListener('click', ()=>{
    validarUSer(email.value, password.value)
})
