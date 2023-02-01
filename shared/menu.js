import { roles } from "../components/checks.js";
import { getData } from "../services/crudservice.js";
const listaDatos = document.getElementById('listaDatos')


console.log(roles[0].texto);

const menu = async(arr) =>{

    const userLocal = JSON.parse(localStorage.getItem('user'));
    const valores = await getData(userLocal.rol, 'roles');
    console.log(valores.data());
    for(let i=0; i<roles.length; i++){
        console.log(i);
    }

    Object.entries(valores.data()).forEach((data)=>{
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
