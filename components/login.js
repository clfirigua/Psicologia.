import {onGetData} from "../services/crudservice.js"
import { redireccion } from "./redireccion.js";

const validarUSer = (email='', password='') =>{

    if(email == '' || password == ''){
        alert('Datos invalidos');
        return 
    };

    onGetData((data)=>{
        let ingreso = false;

        data.forEach(users => {
            const user = users.data();
            if(user.email === email &&  user.password===password ){
                if(user.rol == ''){
                    user.rol = null
                }
                const usuario ={
                    id:users.id,
                    rol:user.rol
                }
                localStorage.setItem('user',JSON.stringify(usuario));
                const url = redireccion(usuario.rol)
                location.href = url;
                ingreso = true;
            };
           
        });

        if(ingreso === false){
            alert('usuario o contraseña invalido')
            return
        }
    }, 'usuarios')


}


export{
    validarUSer
}