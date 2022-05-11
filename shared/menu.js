import { roles } from "../components/checks.js";
import { getData } from "../services/crudservice.js";
const listaDatos = document.getElementById('listaDatos')




const menu = async(arr) =>{

    const userLocal = JSON.parse(localStorage.getItem('user'));
    const valores = await getData(userLocal.rol, 'roles');
    Object.entries(valores.data()).forEach((data)=>{

        for (let i = 0; i < roles.length; i++) {
            if(data[0] ==  roles[i].texto && data[1] == true ){
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

/* prueba */
let dataUpload , dataDownload = []
console.log(dataUpload);