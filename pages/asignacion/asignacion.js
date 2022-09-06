import {notConfirmar} from "../../components/alerts.js";
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
let datosLocal 
let idformulario = '';
let formularioexistente = false;
let asignacionexistente 
menu();
validarSession();
cargarFormularios(); 


function cargarFormularios(){
    
    onSnapshot(filtro,(forms)=>{
        formularios.innerHTML = ``;
        forms.forEach((doc)=>{
            $(formularios).append(`<option value="${doc.id}">${doc.data().nombre}</option>`)
        });
    })
}


formularios.addEventListener('change', (e)=>{
    idformulario = e.target.value;
    validarUsuarios(idformulario);
})

const validarUsuarios =  (id) =>{
    const usuariosAsignados = [];
    const busqueda = query(collection(db, "asignaciones"), where("formulario", "==", id));

    onSnapshot(busqueda,(asignacion)=>{
        asignacion.forEach(data =>{
            asignacionexistente =data.id
            // datosLocal = {
            //     formulario:data.data().formulario
                
            // }
            if(data.data().usuario.lenght != 0){
                data.data().usuario.forEach(usuario =>usuariosAsignados.push(usuario.id));
                formularioexistente = true;
                console.log("existes")
            }else{
                console.log('Sin usarios Asignados');
            }
            
        })
    });

    mostrarListaUsuarios(usuariosAsignados)
}


const mostrarListaUsuarios = (userCa) =>{
    asignar.innerHTML = '';
    asignados.innerHTML = '';
    onGetData((data)=>{
        data.forEach(usuario => {
            const id = usuario.id;
            const {nombres, apellidos} = usuario.data()
            if(userCa.includes(id)){
                mostrarLista(asignados,id,nombres,apellidos)
                
            }else{
                
                mostrarLista(asignar,id,nombres,apellidos)
                
               
            }
        });
    },'usuarios')

}


const mostrarLista = (lista, id, nombre, apellido) =>{
    // console.log(lista)
    $(lista).append(`
    <div class="form-check mt-2">
    <input class="form-check-input validar" type="checkbox" id="${id}" >
    <label class="form-check-label" for="flexCheckDefault">
        ${nombre} ${apellido}
    </label>
    </div>
`)
}

const validarSeleccion = ()=>{
    const validarCheck = document.querySelectorAll('.validar:checked');
    const validarCheckId = [];
    validarCheck.forEach((data)=>{
        let id=data.id;
        let resuelto=false;
        console.log(idformulario)
            validarCheckId.push({id,
                resuelto
            })
        }
    )
    const usuario = validarCheckId;
    const data = {
        formulario: idformulario,
        usuario: usuario
    }
    return data
}
 asignarUno.addEventListener("click", (e)=>{
    const data = validarSeleccion()
    if(formularioexistente == false){
    addData(data, "asignaciones")
    }
    else{
        updateData(asignacionexistente,data, "asignaciones")
    }   
})

desasignarUno.addEventListener("click", (e)=>{
    const data = validarSeleccion()
    updateData(asignacionexistente, 
        {

        },
         "asignaciones")

})