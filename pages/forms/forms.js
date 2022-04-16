import {menu} from "../../shared/menu.js"
import { addData,onGetData,deleteData, getData, updateData } from "../../services/crudservice.js";

const btnModal = document.getElementById("btnModalSiguiente");
const nameForm = document.getElementById("nombreFormulario");


menu()

btnModal.addEventListener("click", (e)=>{
    addData({
        nombre:nameForm.value,
        preguntas:[],
        varemoMedicion:"",
    },"formularios")
    localStorage.setItem("Nameform",nameForm.value)
    // window.location="../newForm/newForm.html";
})