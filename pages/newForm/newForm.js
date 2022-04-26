import { updateData, doc, db, onSnapshot, getData, onGetDocument} from "../../services/crudservice.js";
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


let Preguntas = [];
let varemos = [];
let respuestas = [];


const dataForm = () =>{
  return{
    nombrePregunta: inptPregunta.value,
    tipoDeRespuesta : selectTipoRespuesta.value,
    preguntaDepende: selectPreguntaDepende.value,
    respuestaDepende: selectRespuestaDepende.value,
    varemo: selectVaremo.value,
    respuestas:[]
  }
}

const generarVaremos = (varemos = []) =>{
  divVaremos.innerHTML = '';
  selectVaremo.innerHTML = '<option value="false">Varemo de medicion</option>';

  if(varemos.length === 0){
    $(divVaremos).append(`
      <p>Sin varmos Cargados</p>
    `);
    return
  }
 
  varemos.forEach(varemo => {
    $(selectVaremo).append(`
      <option value="${varemo}">${varemo}</option>
    `);
  });

}

const generarTargetas = () =>{
  
}

const generarPReguntas = (preguntas = []) =>{
  if(preguntas.length == 0){
    return
  }

  preguntas.forEach((data,index)=>{
    $(selectPreguntaDepende).append(`
      <option value="${index}">${data.nombrePregunta}</option>
    `);
  })
}

const cargarDatosForm = () =>{
  onSnapshot(doc(db, "formularios", idFormulario), (doc) => {

    Preguntas = doc.data().preguntas;
    varemos = doc.data().varemoMedicion;

    generarPReguntas(Preguntas)
    generarTargetas(Preguntas);
    generarVaremos(varemos);

  })
}

btnGuardarPregunta.addEventListener('click', (event)=>{
  const formTerminado = dataForm();
  if(respuestas.length == 0 ){
    alert('No tienes respuestas Cargadas');
    return
  }

  formTerminado.respuestas = respuestas;
  Preguntas.push(formTerminado);

  updateData(idFormulario,{preguntas:Preguntas},'formularios');
})

btnGuardarVaremo.addEventListener('click', (event)=>{

  varemos.push(inptNombreVaremo.value);
  inptNombreVaremo.value = "";
  updateData(idFormulario, {varemoMedicion:varemos},'formularios');
  
})

btnGuardarRespuesta.addEventListener('click', (event)=>{
  
  respuestas.push(inptNombreRespuesta.value);
  inptNombreRespuesta.value  = '';
  
})


$(selectPreguntaDepende).on("change", function (e) {
      
  const idFormPregunta = $(this).val();
  let respuestasForm = Preguntas[idFormPregunta].respuestas;

  selectRespuestaDepende.innerHTML="";
  respuestasForm.forEach((data,i) => {
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