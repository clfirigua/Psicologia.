import {ModelusuariosAdmin, editarusuarios} from "../../components/userAdmin.js";
import {notConfirmar} from "../../components/alerts.js";
import { addData,onGetData,deleteData, getData, updateData } from "../../services/crudservice.js";
import { menu } from "../../shared/menu.js";

const inputData = document.getElementById('contUser');
const btnGuardar = document.getElementById('guardar');
const cabeceraTabla = document.getElementById('cabeceraTabla');
const dataTable = document.getElementById('dataTable');
const getRoles = [];
let idUpdate = 0;
menu();

ModelusuariosAdmin.forEach(data => {
    if(data.type == 'select'){
        $(inputData).append(
            `
                <select class="form-select " aria-label="Default select example" id="${data.texto}">
                    <option selected>${data.placeholder}</option>
                </select>

            `
        );
    }else{
        $(inputData).append(
            `
                <input type="${data.type}"  class="form-control mb-2 userAdmin" id="${data.texto}" placeholder="${data.placeholder}" aria-label="${data.placeholder}"
        
                >
            `
        );
    }
    $(cabeceraTabla).append(
        `
        <th scope="col">${data.texto}</th>
        `
    );

});

const roles = document.getElementById('Rol');

onGetData((data)=>{
    roles.innerHTML = ``
    data.forEach((obj) => {
        $(roles).append(`
            <option value="${obj.id}">${obj.data().nombreRol}</option>
        `);
        getRoles.push(
            {
                id:obj.id,
                nombre:obj.data().nombreRol
            }
            )
    });

}, 'roles');


const buscarRol = (idRol) => {
    let nombreRol = '';
    getRoles.forEach(element => {
        if(idRol == element.id){
            nombreRol = element.nombre
        }
    });
    return nombreRol
}

onGetData((data)=>{
    dataTable.innerHTML = ``
    data.forEach((obj) => {
        $(dataTable).append(`
            <tr>
            <td scope="col">${obj.data().nombres}</td>
            <td scope="col">${obj.data().apellidos}</td>
            <td scope="col">${obj.data().telefono}</td>
            <td scope="col">${obj.data().email}</td>
            <td scope="col">${obj.data().cc}</td>
            <td scope="col">${obj.data().usuario}</td>
            <td scope="col">${obj.data().password}</td>
            <td scope="col">${buscarRol(obj.data().rol)}</td>
            <td scope="col"><button class= "btn btn-warning editar" data-id="${obj.id}" >Editar</button></td>
            <td scope="col"><button class= "btn btn-danger eliminar" data-id="${obj.id}" >Eliminar</button></td>
            </tr>
        `);
        const eliminar = document.querySelectorAll(".eliminar"); 
        eliminar.forEach(btn => { 
            btn.addEventListener('click', (e) => {
                
                let identificador = e.target.dataset.id ;
                notConfirmar(identificador,'',deleteData(identificador, 'usuarios') );

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

}, 'usuarios')

btnGuardar.addEventListener('click', ()=>{
    const input = document.getElementsByClassName('userAdmin');
    if(idUpdate != 0 ){
        
        updateData(idUpdate, {
            nombres: input[0].value,
            apellidos: input[1].value,
            telefono: input[2].value,
            email: input[3].value,
            cc: input[4].value,
            usuario: input[5].value,
            password: input[6].value,
            rol: roles.value,
        }, 'usuarios')
        btnGuardar.value = "Guardar"
        return
    }
   
    const data = {
        nombres: input[0].value,
        apellidos: input[1].value,
        telefono: input[2].value,
        email: input[3].value,
        cc: input[4].value,
        usuario: input[5].value,
        password: input[6].value,
        rol: roles.value,
    }
    addData(data, 'usuarios');
})
