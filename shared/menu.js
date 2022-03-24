import { roles } from "../components/checks.js";
const listaDatos = document.getElementById('listaDatos')




const menu = (arr) =>{

    // TODO: Opcional Manejar los datos el  localStorage
    const valores = Object.values(arr);
    valores.pop()
    roles.forEach((data, index) => {

        if (valores[index] == true) {
            $(listaDatos).append(`
            <li class="nav-item m-3 text-capitalize">
                <a class="nav-link " aria-current="page" href="${data.ruta}">${data.texto}</a>
            </li>
        `)
        }

    })

}

export{
    menu
}