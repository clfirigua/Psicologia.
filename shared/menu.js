import { roles } from "../components/checks.js";
import { getData } from "../services/crudservice.js";
const listaDatos = document.getElementById('listaDatos')


//console.log(roles[0].texto);
console.log(roles[0].texto);
const menu = async(arr) =>{

    const userLocal = JSON.parse(localStorage.getItem('user'));
    const valores = await getData(userLocal.rol, 'roles');
    const keys = Object.keys(valores.data())
    const order = ['Dashboard','Usuarios','Roles','Formularios','Asignaciones','Informes','Cerrar_sesion']
    const sortedObj = {}
    order.forEach(key=>{
        sortedObj[key]=valores.data()[key]
    })

    console.log(sortedObj);
    Object.entries(sortedObj).forEach((data)=>{
        console.log(data);
        for (let i = 0; i < roles.length; i++) {
            if( roles[i].slug == data[0]  && data[1] == true ){
                $(listaDatos).append(`
                <li class="nav-item m-3 text-capitalize">
                    <a class="nav-link " aria-current="page" href="${roles[i].ruta}">${roles[i].texto}</a>
                </li>
            `)
            }
        }
    })
}

export{
    menu
}
