import { roles } from "../../components/checks.js";
import { menu } from "../../shared/menu.js";
import {notConfirmar} from "../../components/alerts.js";
import { validarSession } from "../../components/validador.js";
import { addData,onGetData, deleteData, getData, updateData } from "../../services/crudservice.js";

const controles = document.getElementById('contRoles');
const btn = document.getElementById('ver');
const nombreRol = document.getElementById('nombreRol');
const cabeceraTabla = document.getElementById('cabeceraTabla');
const dataTable = document.getElementById('dataTable');

menu();
validarSession()

roles.forEach((data) => {
    $(controles).append(
        `
            <div class="form-check mt-2">
            <input class="form-check-input validar" type="checkbox" value="" id="${data.slug}">
            <label class="form-check-label" for="flexCheckDefault">
                ${data.texto}
            </label>
            </div>
        `
    )
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
const copiaDeSeguridad = document.getElementById('Copia_de_seguridad');
const cerrarSesion = document.getElementById('Cerrar_sesion');




btn.addEventListener('click', () => {
    
    if(nombreRol.value == ''){return alert('Nombre del rol invalido')}
    

    const rolValidar = {
        Dashboard: dashboard.checked,
        Usuarios: usuarios.checked,
        Roles: rolesgroup.checked,
        Formularios: formularios.checked,
        Asignaciones: asignaciones.checked,
        Informes: informes.checked,
        Copia_de_seguridad: copiaDeSeguridad.checked,
        Cerrar_sesion:cerrarSesion.checked,
        nombreRol: nombreRol.value,
    }

    try {
        addData(rolValidar, 'roles');
        reiniciarForm();
    } catch (error) {
        alert(error)
    }

    
})


const reiniciarForm = () => {
    dashboard.checked = false;
    usuarios.checked = false;
    rolesgroup.checked = false;
    formularios.checked = false;
    asignaciones.checked = false;
    informes.checked = false;
    copiaDeSeguridad.checked = false;
    cerrarSesion.checked = false;
    nombreRol.value = '';
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
                    <td>${obj.data().Copia_de_seguridad}</td>
                    <td>${obj.data().Cerrar_sesion}</td>
                    <td scope="col"><button class= "btn btn-warning editar" data-id="${obj.id}" >Editar</button></td>
                    <td scope="col"><button class= "btn btn-danger eliminar" data-id="${obj.id}" >Eliminar</button></td>
                </tr>
            `)
            const eliminar = document.querySelectorAll(".eliminar"); 
            eliminar.forEach(btn => { 
                btn.addEventListener('click', (e) => {
                    let identificador = e.target.dataset.id ;
                    let reference = obj.data().nombreRol
                    notConfirmar(reference,identificador,'roles');
                })
            });
            const editar = document.querySelectorAll('.editar');
            editar.forEach(btn => { 

                btn.addEventListener('click', async (e) =>  {

                    let user = await getData( e.target.dataset.id, 'usuarios');
                    editarusuarios(user.data());
                    idUpdate = e.target.dataset.id;
                    btnGuardar.value = 'Actualizar';
                })
            });
        });
    }, 'roles')
});