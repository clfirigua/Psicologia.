
import { roles } from "../components/checks.js";


const listaDatos = document.getElementById('listaDatos')

const menu = (arr) =>{

    const valores = Object.values(arr);
    valores.pop()
    roles.forEach((data, index) => {

        if (valores[index] == true) {
            $(listaDatos).append(`
            <li class="nav-item">
                <a class="nav-link " href="${data.ruta}">${data.texto}</a>
            </li>
        `)
        }

    })

}

export{
    menu
}