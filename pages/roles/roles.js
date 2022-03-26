import { roles } from "../../components/checks.js";
import { menu } from "../../shared/menu.js";
import { addData,onGetData } from "../../services/crudservice.js";


const controles = document.getElementById('contRoles');
const btn = document.getElementById('ver');
const nombreRol = document.getElementById('nombreRol');
const cabeceraTabla = document.getElementById('cabeceraTabla');
const dataTable = document.getElementById('dataTable');


roles.forEach((data) => {
    $(controles).append(
        `
            <div class="form-check">
            <input class="form-check-input validar" type="checkbox" value="" id="${data.texto}">
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

const dashboard = document.getElementById('dashboard');
const usuarios = document.getElementById('usuarios');
const rolesgroup = document.getElementById('roles');
const formularios = document.getElementById('formularios');
const grupos = document.getElementById('grupos');
const informes = document.getElementById('informes');
const copiaDeSeguridad = document.getElementById('copiaDeSeguridad');
const cargarUsuarios = document.getElementById('cargarUsuarios');




btn.addEventListener('click', () => {
    
    if(nombreRol.value == ''){return alert('Nombre del rol invalido')}
    btn.setAttribute('disabled', '')

    const rolValidar = {
        dashboard: dashboard.checked,
        usuarios: usuarios.checked,
        roles: rolesgroup.checked,
        formularios: formularios.checked,
        grupos: grupos.checked,
        informes: informes.checked,
        copiaDeSeguridad: copiaDeSeguridad.checked,
        cargarUsuarios:cargarUsuarios.checked,
        nombreRol: nombreRol.value,
    }

    try {
        // addData(rolValidar, 'roles');
        menu(rolValidar)
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
    grupos.checked = false;
    informes.checked = false;
    copiaDeSeguridad.checked = false;
    cargarUsuarios.checked = false;
    nombreRol.value = '';
}

$(document).ready(function () {
    onGetData((data)=>{
        dataTable.innerHTML = ``
        data.forEach((obj) => {

            $(dataTable).append(`
                <tr>
                    <td>${obj.data().nombreRol}</td>
                    <td>${obj.data().dashboard}</td>
                    <td>${obj.data().usuarios}</td>
                    <td>${obj.data().roles}</td>
                    <td>${obj.data().formularios}</td>
                    <td>${obj.data().grupos}</td>
                    <td>${obj.data().informes}</td>
                    <td>${obj.data().copiaDeSeguridad}</td>
                    <td>${obj.data().cargarUsuarios}</td>
                </tr>
            `)
        });
    }, 'roles')
});