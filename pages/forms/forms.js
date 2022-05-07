import { menu } from "../../shared/menu.js"
import { addData, onGetData, deleteData, getData, updateData } from "../../services/crudservice.js";

const btnModal = document.getElementById("btnModalSiguiente");
const nameForm = document.getElementById("nombreFormulario");
const forms = document.getElementById("forms");

menu()

onGetData((data) => {
    forms.innerHTML = ``
    data.forEach((obj) => {

        $(forms).append(`
            <div class="col-sm-4 mt-3 col-xs-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${obj.data().nombre}</h5>
                        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. At?</p>
                        <a class="btn btn-primary ver" data-id="${obj.id}" >Editar</a>
                        <a class="btn btn-danger mt-2 delete" data-id="${obj.id}" >Eliminar</a>
                        <a class="btn btn-info mt-2 asignar" data-id="${obj.id}" >Asignar</a>
                    </div>
                </div>
            </div>
        `)
    });

    const form = document.querySelectorAll('.ver');
    form.forEach(btn => {
        btn.addEventListener('click', (e) => {

            localStorage.setItem("idForm",e.target.dataset.id);
            window.location = "../newForm/newForm.html";
  
  
        })
      });
    
      const deleteform = document.querySelectorAll('.delete');
      deleteform.forEach(btn => {
          btn.addEventListener('click', (e) => {
  
              deleteData(e.target.dataset.id, 'formularios')
    
          })
        });



}, 'formularios')

btnModal.addEventListener("click", async (e) => {
    e.preventDefault();
    let data = await addData({
        nombre: nameForm.value,
        preguntas: [],
        varemoMedicion: [],
        asignaciones:[]
    }, "formularios");
    if (data.id) {
        localStorage.setItem("idForm", data.id);
        window.location = "../newForm/newForm.html";
    }

})