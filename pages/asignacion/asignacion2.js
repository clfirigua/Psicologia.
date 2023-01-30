import { addData,onGetData,deleteData, getData, updateData, onSnapshot, doc, collection ,db} from "../../services/crudservice.js";
import { menu } from "../../shared/menu.js";
import {validarSession} from "../../components/validador.js"
import { query, where, orderBy } from "../../services/firebaseservice.js";


const formularios = document.getElementById('formularios')
const usuarioAsignacion = document.getElementById('usuarioAsignacion')
const usuarioAsignado = document.getElementById('usuarioAsignado')
const asignados = document.getElementById('asignados')
const asignar = document.getElementById('asignar')
const asignarUno = document.getElementById('asignarUno')
const asignarTodos = document.getElementById('asignarTodos')
const desasignarTodos = document.getElementById('desasignarTodos')
const desasignarUno = document.getElementById('desasignarUno')
const filtro = query(collection(db, "formularios"), orderBy("nombre", "asc"));




let idformulario
let formularioexistente = false;
let asignacionexistente 
let asignadosArray = [];
let usuarios = []

menu()
validarSession()
cargarFormularios(); 


function cargarFormularios(){

    onSnapshot(filtro,(forms)=>{
        formularios.innerHTML = ``;
        formularios.innerHTML = `<option value="disable" selected disabled > Seleccione un formulario </option>`
        forms.forEach((doc)=>{
            $(formularios).append(`<option value="${doc.id}">${doc.data().nombre}</option>`)
        });
    })
}

formularios.addEventListener('change', (e)=>{
    asignadosArray = [];
    idformulario = e.target.value;
    console.log(idformulario);
    validarAsignacion(idformulario);
})

onGetData(async(data) =>{
    await data.forEach((usuario) =>{
        usuarios.push([usuario.id, usuario.data()])
    })
},"usuarios")

console.log(usuarios);

//validacion si ya existe una asignacion con el formulario enviado
function validarAsignacion(id){
    // const usuariosAsignados = []
    const busqueda = query(collection(db, "asignaciones"), where("formulario", "==", id));
    onSnapshot(busqueda, async(asignacion)=>{
        await asignacion.forEach((data)=>{
                asignacionexistente = data.id;
                if(data.data().usuario.length != 0){
                    // data.data().usuario.forEach(usuario =>usuariosAsignados.push(usuario.id));
                    data.data().usuario.forEach(usuario =>asignadosArray.push([ usuario.id, usuario]));
                    formularioexistente = true;
                }else{
                    console.log('Sin usuarios ');
                }
        }        
        )
    })
    mostrarListaUsuarios(asignadosArray)
}

function mostrarListaUsuarios(asignadosArray){
    asignar.innerHTML = '';
    asignados.innerHTML = '';
    console.log(asignadosArray.length,usuarios);
    for(let i=0; i<asignadosArray.length;i++){
        console.log(i);
    }    
}

// function asignados(usuarios){

// }