import {onGetData} from "../services/crudservice.js"


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
                const usuario ={
                    id:users.id,
                    rol:user.rol
                }
                localStorage.setItem('user',JSON.stringify(usuario));
                location.href ='../pages/dashboard/dashboard.html';
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