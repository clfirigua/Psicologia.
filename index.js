import {validarUSer} from "./components/login.js"
import {getData} from "./services/crudservice.js";
import { redireccion } from "./components/redireccion.js"
const btnEnviar = document.getElementById('enviar');
const email = document.getElementById('email');
const password = document.getElementById('password');
const sess = localStorage.getItem('user');



const  validarUSerLocal  = async()  =>{
    if(sess != null){
        const userJson = JSON.parse(localStorage.getItem('user'));
        const dataUser = await getData(userJson.id, 'usuarios');
        if(dataUser.id === userJson.id){
          const url = redireccion(JSON.stringify(userJson.id))
          location.href =url;
        }else{
            localStorage.removeItem('user');
        }       
    }
    
}

validarUSerLocal();

document.addEventListener("keyup", (e)=>{
    const key = "Enter";
    if(e.key === key){
       validarUSer(email.value, password.value)
    }
})

btnEnviar.addEventListener('click', ()=>{
    validarUSer(email.value, password.value)
})
