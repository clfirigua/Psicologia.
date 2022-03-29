import {validarUSer} from "../../components/login.js"
import {getData} from "./services/crudservice.js";
const btnEnviar = document.getElementById('enviar');
const email = document.getElementById('email');
const password = document.getElementById('password');
const sess = localStorage.getItem('user');



const  validarUSerLocal  = async()  =>{
    if(sess != null){
        const userJson = JSON.parse(localStorage.getItem('user'));
        const dataUser = await getData(userJson.id, 'usuarios');

        if(dataUser.id === userJson.id){
            location.href ='../pages/dashboard/dashboard.html';
        }else{
            localStorage.removeItem('user');
        }
        
        
    }
    
}

validarUSerLocal();



btnEnviar.addEventListener('click', ()=>{

    validarUSer(email.value, password.value)
})