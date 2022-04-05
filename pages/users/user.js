import {Modelusuarios} from "../../components/user.js";
import {readFile, usersData} from "../../components/importCsv.js";
import { menu } from "../../shared/menu.js";
import { addData } from "../../services/crudservice.js";
const modelUser =  document.getElementById('contUser');
const importCSV = document.getElementById('import');
const cargarScv = document.getElementById('cargarScv');
const tcabecera = document.getElementById('tableCabecera');
const tcuerpo = document.getElementById('cuerpoTabla');
const btnGuardar = document.getElementById('guardar');
const btnGuardarfire = document.getElementById('fire');
importCSV.addEventListener('change', readFile, false);

menu();

Modelusuarios.forEach(data => {
        // $(modelUser).append(
        //     `
        //         <input type="${data.type}" class="form-control mb-2 usuarios" placeholder="${data.placeholder}" aria-label="${data.placeholder}"
        
        //         >
        //     `
        // );

    $(tcabecera).append(
        `
            <th scope="col">${data.texto}</th>
        `
    )
});

cargarScv.addEventListener('click', ()=>{

    usersData.forEach((data, index) => {
            $(tcuerpo).append(
                `
                <tr>
                    <td>${index +1}</td>
                    <td>${data.nombres}</td>
                    <td>${data.apellidos}</td>
                    <td>${data.telefono}</td>
                    <td>${data.email}</td>
                    <td>${data.cc}</td>
                    <td>${data.usuario}</td>
                    <td>${data.password}</td>
                </tr>
                `
            )
    });

});

btnGuardarfire.addEventListener('click', ()=>{

    usersData.forEach((data)=>{
        addData(data,'pruebas')
    })
    
})


btnGuardar.addEventListener('click', ()=>{
    const dataUser= document.getElementsByClassName('usuarios');

    for (let i = 0; i < dataUser.length; i++) {
        const element = dataUser[i];
        console.log(element.value)
    }

})








