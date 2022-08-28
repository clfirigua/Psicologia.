import {notConfirmar} from "../../components/alerts.js";
import { addData,onGetData,deleteData, getData, updateData, onSnapshot, doc, collection ,db} from "../../services/crudservice.js";
import { menu } from "../../shared/menu.js";
import {validarSession} from "../../components/validador.js"
import { query, where, orderBy } from "../../services/firebaseservice.js";


menu();
validarSession();


const formularios = document.getElementById('formularios')
const usuarioAsignacion = document.getElementById('usuarioAsignacion')
const usuarioAsignado = document.getElementById('usuarioAsignado')
const asignados = document.getElementById('asignados')
const asignar = document.getElementById('asignar')
const asignarUno = document.getElementById('asignarUno')
const asignarTodos = document.getElementById('asignarTodos')
const desasignarTodos = document.getElementById('desasignarTodos')
const desasignarUno = document.getElementById('desasignarUno')

cargarFormularios(); 
cargarUsuariosAsignar();

function cargarFormularios(){
    const q = query(collection(db, "formularios"), orderBy("nombre", "asc"));
    const unsuscribe = onSnapshot(q,(querySnapshot)=>{
        const nombreFormularios = []
        querySnapshot.forEach((doc)=>{
            nombreFormularios.push(doc)
        });
        nombreFormularios.forEach((data)=>{
            $(formularios).append(`
            <option value="${data.id}">${data.data().nombre}</option>
          `);
        })
    })
}

function cargarUsuariosAsignar(){
    onGetData((data)=>{
        asignar.innerHTML = '';
        data.forEach((obj)=>{
            if(obj.data().rol == ""){
            $(asignar).append(`
                <div class="form-check mt-2">
                <input class="form-check-input validar" type="checkbox" id="${obj.id}" >
                <label class="form-check-label" for="flexCheckDefault">
                    ${obj.data().nombres} ${obj.data().apellidos}
                </label>
                </div>
            `
            )
        }
        })
    },'usuarios')
}
formularios.addEventListener('change', (e)=>{
    let seleccionFormulario = e.target.value;
    let formularioAsignado=[]
    let asignacionCreada =false
    onGetData((data)=>{
        data.forEach((obj)=>{
            formularioAsignado.push(obj.data().formulario);
        })
        formularioAsignado.forEach(e => {
            console.log(seleccionFormulario, e)
            if(seleccionFormulario == e){
                asignacionCreada = true
                console.log("son iguales");
            //     addData({
            //         formulario:null, 
            //         usuarioll
            //     },"asignaciones")
                }
            else{
                console.log("son diferentes");
            }
            console.log(asignacionCreada)
        });
    },'asignaciones')
})
asignarUno.addEventListener("click", (e)=>{

    const validarCheck = document.querySelectorAll('.validar:checked');
    const validarCheckId = [];
    validarCheck.forEach((data)=>{
        let id=data.id;
        let resuelto=false;
            validarCheckId.push({id,
                resuelto
            })
        }
    )
    const usuario = validarCheckId;
    const data = {
        formulario: formularios.value,
        usuario: usuario
        
    }
    addData(data, "asignaciones")

})