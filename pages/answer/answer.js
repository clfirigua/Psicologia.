import { getData, onGetData } from "../../services/crudservice.js";

const cardForms = document.getElementById("cardForms");
const titulo = document.getElementById('nombreFormulario');
const id = localStorage.getItem("idformuser");



const formulario = async () => {
    const form = await getData(id, 'formularios');
    titulo.innerText = form.data().nombre;
    form.data().preguntas.forEach((pregunta, index) => {
        $(cardForms).append(`
        <div class="card">
        <div class="card-body" id="${index}">
          <h5 class="card-title">${pregunta.nombrePregunta}</h5>
          ${cargarRespuestas(index, pregunta.respuestas)}
        </div>
        </div>
        `);
    });
}

const cargarRespuestas = (index, respuestas) =>{
    let lista = '';
    respuestas.forEach(respuesta =>{
        lista = lista +         `
                
        <div class="form-check">
        <input class="form-check-input" type="radio" name="${index}" id="flexRadioDefault1">
        <label class="form-check-label" for="flexRadioDefault1">
          ${respuesta}
        </label>
        </div>
        
    `
    })

    return lista
}


formulario()


// ${pregunta.respuestas.forEach(respuesta =>{
//     `
//     <div class="form-check">
//     <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
//     <label class="form-check-label" for="flexRadioDefault1">
//       Default radio
//     </label>
//     </div>
//     `
//   })}