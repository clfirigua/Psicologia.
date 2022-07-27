import {notConfirmar} from "../../components/alerts.js";
import { addData,onGetData,deleteData, getData, updateData, onSnapshot, doc } from "../../services/crudservice.js";
import { menu } from "../../shared/menu.js";
import {validarSession} from "../../components/validador.js"

menu();
validarSession();
cargarformularios(); 

const formularios = document.getElementById('formularios')
const usuarioAsignacion = document.getElementById('usuarioAsignacion')
const usuarioAsignado = document.getElementById('usuarioAsignado')
const asignados = document.getElementById('asignados')
const asignar = document.getElementById('asignar')
const asignarUno = document.getElementById('asignarUno')
const asignarTodos = document.getElementById('asignarTodos')
const desasignarTodos = document.getElementById('desasignarTodos')
const desasignarUno = document.getElementById('desasignarUno')


function cargarFormularios(){
    onSnapshot(doc(db,"formularios",))
}