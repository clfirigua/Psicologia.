import { roles } from "../../components/checks.js";
import { menu } from "../../shared/menu.js";
const controles = document.getElementById('contRoles');
const btn = document.getElementById('ver');
const nombreRol = document.getElementById('nombreRol');
const cabeceraTabla = document.getElementById('cabeceraTabla');


roles.forEach((data) => {
    $(controles).append(
        `
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="${data.texto}">
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




btn.addEventListener('click', () => {
    const rolValidar = {
        dashboard: dashboard.checked,
        usuarios: usuarios.checked,
        roles: rolesgroup.checked,
        formularios: formularios.checked,
        grupos: grupos.checked,
        informes: informes.checked,
        copiaDeSeguridad: copiaDeSeguridad.checked,
        nombreRol: nombreRol.value
    }

    menu(rolValidar);
})
