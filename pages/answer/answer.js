import { getData, onGetData } from "../../services/crudservice.js";

const cardForms = document.getElementById("cardForms");
const titulo = document.getElementById('nombreFormulario');
const timer = document.getElementById('tiempo');
const id = localStorage.getItem("idformuser");
const btn = document.getElementById('siguiente');
let pregunta = 0;
let preguntasform = [];
let s = 0;
const respuestas = [];
let varemo = '';

const tiempo = () => {
  setInterval(function () {
    var hour = Math.floor(s / 3600);
    hour = (hour < 10) ? '0' + hour : hour;
    var minute = Math.floor((s / 60) % 60);
    minute = (minute < 10) ? '0' + minute : minute;
    var second = s % 60;
    second = (second < 10) ? '0' + second : second;
    timer.innerText = hour + ':' + minute + ':' + second
    s = s - 1
  }, 1000)
}


const cargarpregunta = (pregunta) => {
  cardForms.innerHTML = '';
  varemo = preguntasform[pregunta].varemo;
  $(cardForms).append(`
      <div class="card">
        <div class="card-body" id="${pregunta}">
          <h5 class="card-title">${preguntasform[pregunta].nombrePregunta}</h5>
          ${cargarRespuestas(pregunta, preguntasform[pregunta].respuestas)}
        </div>
      </div>
        `);
}

const formulario = async () => {
  const form = await getData(id, 'formularios');
  titulo.innerText = form.data().nombre;
  preguntasform = form.data().preguntas;
  cargarpregunta(pregunta);
  s=form.data().tiempo;
  tiempo();
}

formulario();

const cargarRespuestas = (index, respuestas) =>{
  let lista = '';
  respuestas.forEach(respuesta =>{
      lista = lista +  `
              
      <div class="form-check">
      <input class="form-check-input" type="radio" name="${index}" id="${index}" value=${respuesta}>
      <label class="form-check-label" >
        ${respuesta}
      </label>
      </div>
      
  `
  })

  return lista
}

btn.addEventListener('click', ()=>{
  respuestas.push({
    index:pregunta,
    respuesta:$(`input:radio[name=${pregunta}]:checked`).val(),
    varemo
  });
  console.log(respuestas)
  pregunta++
  cargarpregunta(pregunta)

})