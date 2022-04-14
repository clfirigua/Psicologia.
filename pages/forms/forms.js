import {menu} from "../../shared/menu.js"

const btnModal = document.getElementById("btnModalSiguiente");
const nameForm = document.getElementById("nombreFormulario");

menu()

btnModal.addEventListener("click", (e)=>{
    localStorage.setItem("Nameform",nameForm.value)
    window.location="../newForm/newForm.html";
})