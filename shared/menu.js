import { roles } from "../components/checks.js";
import { getData } from "../services/crudservice.js";
const listaDatos = document.getElementById('listaDatos')




const menu = async(arr) =>{

    const userLocal = JSON.parse(localStorage.getItem('user'));
    const valores = await getData(userLocal.rol, 'roles');
    let a
    Object.entries(valores.data()).forEach((data)=>{

        for (let i = 0; i < roles.length; i++) {
            if(data[0] ==  roles[i].texto && data[1] == true ){
                a = roles.sort((a, b) => a.texto.localeCompare(b.texto))
                
            //     $(listaDatos).append(`
            //     <li class="nav-item m-3 text-capitalize">
            //         <a class="nav-link " aria-current="page" href="${roles[i].ruta}">${roles[i].texto}</a>
            //     </li>
            // `)
            }
        }
    })

    Object.entries(valores.data()).forEach((data)=>{
        
        for (let i = 0; i < a.length; i++) {
            console.log(a[i].texto);
            if(a[i].texto==data[0] && data[1] == true ){                
                console.log(data[0]," ", a[i].texto);
                $(listaDatos).append(`
                <li class="nav-item m-3 text-capitalize">
                    <a class="nav-link " aria-current="page" href="${a[i].ruta}">${a[i].texto}</a>
                </li>
            `)
            }
        }
    })
}

export{
    menu
}
