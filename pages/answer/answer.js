import { onGetData } from "../../services/crudservice.js";

const cardForms =  document.getElementById("cardForms");
const id = JSON.parse(localStorage.getItem("user"))

const asignados = asignacion(id.id);
console.log(asignados);
visualizarFormularios(asignados);

function visualizarFormularios (asignados)  {

    onGetData((data) =>{
        cardForms.innerHTML=``;
        data.forEach(obj => {
        const idForm =  asignados.find(e => e == obj.id)
        if (idForm != undefined){
            $(cardForms).append(`
            <div class="col mb-3">
                <div class="card card-shadow">
                    <div class="card-body">
                        <h5 class="card-title">${obj.data().nombre}</h5>
                        <button data-id="${obj.id}" class="btn btn-primary selectorFormulario">Responder formulario</button>
                    </div>
                </div>
            </div>
            `);
            const selector =  document.querySelectorAll('.selectorFormulario');
            selector.forEach((btn)=>{
                btn.addEventListener("click", (e) =>{
                    localStorage.setItem("FormularioResponder",e.target.dataset.id);
                    window.location='../formsAnswer/formAnswer.html'
                });
            });
        }});

    },"formularios");
}
function asignacion(id){
    let formulariosAsignados = []
    onGetData((data)=>{
        data.forEach(obj =>{
            obj.data().usuarios.forEach(
                e =>{
                    if ( e.id == id){
                        formulariosAsignados.push(obj.data().idFormulario)
                    }
                }
            )
        })
    },"asignaciones")

    return formulariosAsignados
}
