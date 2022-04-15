import {menu} from "../../shared/menu.js"

<<<<<<< HEAD
const btn = document.getElementById('newForm');

menu()


btn.addEventListener('click', (event)=>{
    event.preventDefault();
    location.href ='../newForm/newForm.html';
=======
const btnModal = document.getElementById("btnModalSiguiente");
const nameForm = document.getElementById("nombreFormulario");

menu()

btnModal.addEventListener("click", (e)=>{
    localStorage.setItem("Nameform",nameForm.value)
    window.location="../newForm/newForm.html";
>>>>>>> 8e208ca04afdb13e20dc08f8bcfa2cef7e379503
})