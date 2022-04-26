import { updateData, doc, db, onSnapshot, getData, onGetDocument } from "../../services/crudservice.js";
import { menu } from "../../shared/menu.js";

const idFormulario = localStorage.getItem('idForm');

const inptPregunta = document.getElementById('pregunta');
const inptNombreVaremo = document.getElementById('recipient-name');
const inptNombreRespuesta = document.getElementById('inpRespuestas');

const selectTipoRespuesta = document.getElementById('tpRespuesta');
const selectPreguntaDepende = document.getElementById('dPregunta');
const selectRespuestaDepende = document.getElementById('dRespuesta');
const selectVaremo = document.getElementById('varemo');

const btnGuardarPregunta = document.getElementById('guardarPregunta');
const btnGuardarVaremo = document.getElementById('btnGuardarVaremo');
const btnGuardarRespuesta = document.getElementById('btnGuardarRespuesta');

const divVaremos = document.getElementById('varemos');
const divRespuestas = document.getElementById('containerRespuestas');
const divPreguntas = document.getElementById('targetPreguntas');


let Preguntas = [];
let varemos = [];
let respuestas = [];


const dataForm = () => {
  return {
    nombrePregunta: inptPregunta.value,
    tipoDeRespuesta: selectTipoRespuesta.value,
    preguntaDepende: selectPreguntaDepende.value,
    respuestaDepende: selectRespuestaDepende.value,
    varemo: selectVaremo.value,
    respuestas: []
  }
}

const generarVaremos = (varemos = []) => {
  divVaremos.innerHTML = '';
  selectVaremo.innerHTML = '<option value="false">Varemo de medicion</option>';

  if (varemos.length === 0) {
    $(divVaremos).append(`
      <p>Sin varmos Cargados</p>
    `);
    return
  }

  varemos.forEach(varemo => {
    $(selectVaremo).append(`
      <option value="${varemo}">${varemo}</option>
    `);

    $(divVaremos).append(`
      <p>${varemo}</p>
    `);
  });

}

const generarTargetas = (preguntas) => {

  if(preguntas.length === 0){
    $(divPreguntas).append(`
      <p>Sin Preguntas Guardadas</p>
    `);
    return
  }

  divPreguntas.innerHTML='';

  preguntas.forEach((pregunta, index)=>{

    $(divPreguntas).append(`
        <div class="card-shadow mt-3 p-2">
          <h3><strong>${pregunta.nombrePregunta}</strong></h3>
          <p>Tipo de Respuesta: <strong>${pregunta.tipoDeRespuesta} </strong></p>
          <p>Depende de la pregunta:<strong>${pregunta.preguntaDepende}</strong></p>
          <p>Depende de la respuesta: <strong>${pregunta.respuestaDepende}</strong></p>
          <p>Baremo a medir: <strong>${pregunta.varemo}</strong></p>
          <p>Respuestas</p>
          <ul class="list-group" id="${index}">

          </ul>
        </div>
    `);

    const list = document.getElementById(index);
    pregunta.respuestas.forEach((respuesta,index)=>{
      $(list).append(`
        <li class="list-group-item">${index+1}. ${respuesta}</li>
      `);
    })

  })


}

const generarPReguntas = (preguntas = []) => {
  if (preguntas.length == 0) {
    return
  }

  selectPreguntaDepende.innerHTML = '<option value="false">Seleccione una pregunta</option>';
  preguntas.forEach((data, index) => {
    $(selectPreguntaDepende).append(`
      <option value="${index}">${data.nombrePregunta}</option>
    `);
  })
}

const cargarDatosForm = () => {
  onSnapshot(doc(db, "formularios", idFormulario), (doc) => {

    Preguntas = doc.data().preguntas;
    varemos = doc.data().varemoMedicion;

    generarPReguntas(Preguntas)
    generarTargetas(Preguntas);
    generarVaremos(varemos);

  })
}

btnGuardarPregunta.addEventListener('click', (event) => {
  const formTerminado = dataForm();
  if (respuestas.length == 0) {
    alert('No tienes respuestas Cargadas');
    return
  }

  formTerminado.respuestas = respuestas;
  Preguntas.push(formTerminado);

  updateData(idFormulario, { preguntas: Preguntas }, 'formularios');
  respuestas = [];
  divRespuestas.innerHTML = '';

})

btnGuardarVaremo.addEventListener('click', (event) => {

  varemos.push(inptNombreVaremo.value);
  inptNombreVaremo.value = "";
  updateData(idFormulario, { varemoMedicion: varemos }, 'formularios');

})

btnGuardarRespuesta.addEventListener('click', (event) => {

  respuestas.push(inptNombreRespuesta.value);
  inptNombreRespuesta.value = '';
  divRespuestas.innerHTML = '';

  respuestas.forEach(element => {
    $(divRespuestas).append(`
         <p>${element}</p>
      `);
  });
  

})


$(selectPreguntaDepende).on("change", function (e) {

  const idFormPregunta = $(this).val();
  let respuestasForm = Preguntas[idFormPregunta].respuestas;

  selectRespuestaDepende.innerHTML = "";
  respuestasForm.forEach((data, i) => {
    $(selectRespuestaDepende).append(
      `
        <option value="${i}" class="seleccionar" >${data}</option>
        `
    )
  }
  )
})


$(document).ready(function () {

  menu();
  cargarDatosForm();


});