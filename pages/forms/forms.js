import {menu} from "../../shared/menu.js"
import { addData,onGetData, getData } from "../../services/crudservice.js";
import {validarSession} from "../../components/validador.js"
import { notConfirmar } from "../../components/alerts.js";

const btnModal = document.getElementById("btnModalSiguiente");
const nameForm = document.getElementById("nombreFormulario");
const formList = document.getElementById("forms");
const tiempo = document.getElementById("tiempo");
const datosUser = JSON.parse(localStorage.getItem('user'));

validarSession() 
menu()
formularios()

btnModal.addEventListener("click", async (e)=>{
    e.preventDefault();
    let data =  await addData({
        nombre:nameForm.value,
        preguntas:[],
        usuario:datosUser.id,
        tiempo:tiempo.value* 60,
        varemoMedicion:[],
    },"formularios");
    if(data.id){
        localStorage.setItem("idForm",data.id);
        window.location="../newForm/newForm.html";
    }

})


function formularios(){
    onGetData((data)=>{
        formList.innerHTML = '';
        data.forEach((obj)=>{
            $(formList).append(`
            <div class="card-shadow mt-1 mb-1 p-1 row">
                <div class="col-6">
                    <p class="fw-bold m-auto">${obj.data().nombre}</p>
                </div>
                <div class="col-3">
                <button class= "btn btn-warning editar" data-id="${obj.id}" >Editar</button>
                </div>
                <div class="col-3">
                    <button class= "btn btn-danger eliminar" data-id="${obj.id}" >Eliminar</button>
                </div>
          </div>
            `
            );
            const eliminar = document.querySelectorAll(".eliminar");
            eliminar.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    let identificador = e.target.dataset.id ;
                    let reference = obj.data().nombre
                    notConfirmar(identificador,'formularios');
                }
            )
            });
            const editar = document.querySelectorAll('.editar');
            editar.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    let form = await getData( e.target.dataset.id, 'formularios');
                    localStorage.setItem("idForm",form.id);
                    window.location="../newForm/newForm.html";
                }
            )
            });
        })
    },"formularios")
}
