import {readFile, usersData,exportarData} from "../../components/importCsv.js";
import { addData } from "../../services/crudservice.js";


const importCSV = document.getElementById('import');
const cargarScv = document.getElementById('cargarScv');
const tcabecera = document.getElementById('tableCabecera');
const tcuerpo = document.getElementById('cuerpoTabla');
const btnGuardar = document.getElementById('guardar');
const exportar = document.getElementById("exportar");
const btnGuardarfire = document.getElementById('fire');
importCSV.addEventListener('change', readFile, false);

cargarScv.addEventListener('click', ()=>{
console.log(usersData, readFile);
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
    let confirmar = confirm("el archivo ya fue cargado y esta listo para guardar en base de datos, ¿desea continuar?")
if(confirmar){
    usersData.forEach((data)=>{
        addData(data,'usuarios')
    })
    alert("los datos se guardaron correctamente en la base de datos")

}
else{
    alert("los datos no se guardaron en la base de datos")
}
});

// btnGuardarfire.addEventListener('click', ()=>{


    
// })


btnGuardar.addEventListener('click', ()=>{
    const dataUser= document.getElementsByClassName('usuarios');

    for (let i = 0; i < dataUser.length; i++) {
        const element = dataUser[i];
        console.log(element.value)
    }

})

exportar.addEventListener('click',()=>{
    alert("remplaza los datos correspondientes")
const data = "nombres;apellidos;Celular;Correo;identificacion;usuario;contraseña"
const nombreArchivo = "ejemplo.csv"
exportarData(data, nombreArchivo)
})







