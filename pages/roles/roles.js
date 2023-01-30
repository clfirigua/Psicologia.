import { roles } from "../../components/checks.js";
import { menu } from "../../shared/menu.js";
import {notConfirmar} from "../../components/alerts.js";
import { validarSession } from "../../components/validador.js";
import { addData,onGetData, deleteData, getData, updateData } from "../../services/crudservice.js";

const controles = document.getElementById('contRoles');
const btnGuardar = document.getElementById('ver');
const nombreRol = document.getElementById('nombreRol');
const cabeceraTabla = document.getElementById('cabeceraTabla');
const dataTable = document.getElementById('dataTable');
const botones = document.getElementById('botones');
var idUpdate=0;
menu();
validarSession()

roles.forEach((data) => {
switch (data.slug){
    case "Dashboard":
        $(controles).append(
            `
                <div class="form-check mt-2">
                <input class="form-check-input validar" type="checkbox" checked="true" disabled id="${data.slug}">
                <label class="form-check-label" for="flexCheckDefault">
                    ${data.texto}
                </label>
                </div>
            `
        )

        break;
    case "Cerrar_sesion":
        $(controles).append(
            `
                <div class="form-check mt-2">
                <input class="form-check-input validar" type="checkbox" checked="true" disabled id="${data.slug}">
                <label class="form-check-label" for="flexCheckDefault">
                    ${data.texto}
                </label>
                </div>
            `
        )

        break;
    default:
        $(controles).append(
            `
                <div class="form-check mt-2">
                <input class="form-check-input validar" type="checkbox" id="${data.slug}">
                <label class="form-check-label" for="flexCheckDefault">
                    ${data.texto}
                </label>
                </div>
            `
        )
        
}
$(cabeceraTabla).append(
    `
        <th scope="col">${data.texto}</th>
    `
)   
})

const dashboard = document.getElementById('Dashboard');
const usuarios = document.getElementById('Usuarios');
const rolesgroup = document.getElementById('Roles');
const formularios = document.getElementById('Formularios');
const asignaciones = document.getElementById('Asignaciones');
const informes = document.getElementById('Informes');
const cerrarSesion = document.getElementById('Cerrar_sesion');




btnGuardar.addEventListener('click', () => {
    
    if(nombreRol.value == ''){return alert('Nombre del rol invalido')}
    
    if(idUpdate !=0){
        updateData(idUpdate,{
            Dashboard: dashboard.checked,
            Usuarios: usuarios.checked,
            Roles: rolesgroup.checked,
            Formularios: formularios.checked,
            Asignaciones: asignaciones.checked,
            Informes: informes.checked,
            Cerrar_sesion:cerrarSesion.checked,
            nombreRol: nombreRol.value,
            },'roles')
            btnGuardar.value="Guardar"
            //btncancelar();
            reiniciarForm();
            return
    }else{
        const rolValidar = {
            Dashboard: dashboard.checked,
            Usuarios: usuarios.checked,
            Roles: rolesgroup.checked,
            Formularios: formularios.checked,
            Asignaciones: asignaciones.checked,
            Informes: informes.checked,
            Cerrar_sesion:cerrarSesion.checked,
            nombreRol: nombreRol.value,
        }
        try {
            addData(rolValidar, 'roles');
            reiniciarForm();
        } catch (error) {
            alert(error)
        }
    }
})

// const addbtncancelar = (id) => {
//     if(id=idUpdate){}
//         $(botones).append(
//             `
//             <input type="button" class="btn btn-danger " value="Cancelar" id="cancelar">
//             `
//         )
    
    
// }
// const btncancelar = () =>{
//     const btnremovecancelar = document.getElementById("cancelar")
//     btnremovecancelar.remove();
// }
const reiniciarForm = () => {
    dashboard.checked = true;
    usuarios.checked = false;
    rolesgroup.checked = false;
    formularios.checked = false;
    asignaciones.checked = false;
    informes.checked = false;
    cerrarSesion.checked = true;
    nombreRol.value = '';
}

const editarRoles =(obj) => {
    dashboard.checked = obj.Dashboard;
    asignaciones.checked = obj.Asignaciones;
    cerrarSesion.checked = obj.Cerrar_sesion;
    formularios.checked = obj.Formularios;
    informes.checked = obj.Informes;
    rolesgroup.checked = obj.Roles;
    usuarios.checked = obj.Usuarios;
    nombreRol.value = obj.nombreRol;

}
$(document).ready(function () {
    onGetData((data)=>{
        dataTable.innerHTML = ``
        data.forEach((obj) => {

            $(dataTable).append(`
                <tr>
                    <td>${obj.data().nombreRol}</td>
                    <td>${obj.data().Dashboard}</td>
                    <td>${obj.data().Usuarios}</td>
                    <td>${obj.data().Roles}</td>
                    <td>${obj.data().Formularios}</td>
                    <td>${obj.data().Asignaciones}</td>
                    <td>${obj.data().Informes}</td>
                    <td>${obj.data().Cerrar_sesion}</td>
                    <td scope="col"><button class= "btn btn-warning editar" data-id="${obj.id}" >Editar</button></td>
                    <td scope="col"><button class= "btn btn-danger eliminar" data-id="${obj.id}" >Eliminar</button></td>
                </tr>
            `)
            const eliminar = document.querySelectorAll(".eliminar"); 
            eliminar.forEach(btn => { 
                btn.addEventListener('click', (e) => {
                    let identificador = e.target.dataset.id ;
                    notConfirmar(identificador,'roles');
                })
            });
            const editar = document.querySelectorAll('.editar');
            editar.forEach(btn => { 
                btn.addEventListener('click', async (e) =>  {
                    idUpdate = e.target.dataset.id;
                    let user = await getData(idUpdate, 'roles');
                    editarRoles(user.data());
                    btnGuardar.value = 'Actualizar';
                })
            });
        });
    }, 'roles')
});
