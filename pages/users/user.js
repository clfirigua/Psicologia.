import {Modelusuarios} from "../../components/user.js";
import {readFile, usersData} from "../../components/importCsv.js";
const modelUser =  document.getElementById('contUser');
const importCSV = document.getElementById('import');
const cargarScv = document.getElementById('cargarScv');
const tcabecera = document.getElementById('tableCabecera');
const tcuerpo = document.getElementById('cuerpoTabla');
importCSV.addEventListener('change', readFile, false);
const required = (data) =>{
    if(data){
        return 'required'
    }
    return
}
Modelusuarios.forEach(data => {
    $(modelUser).append(
        `
            <input type="${data.type}" class="form-control mb-2" placeholder="${data.placeholder}" aria-label="Username" id="nombreRol"
            ${required(data.required)} 
            >
        `
    );

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

})





