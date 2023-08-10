import { question } from "../../components/questions.js";
import { updateData, doc, db, onSnapshot, getData} from "../../services/crudservice.js";
import { menu } from "../../shared/menu.js";
import {validarSession} from "../../components/validador.js"

const nameForm = document.getElementById("nombreFormulario")
const localname = localStorage.getItem("Nameform")
const addQuestion = document.getElementById("añadirPreguntas")
const modalVaremo = document.getElementById("varemos");
const inpVaremo = document.getElementById("recipient-name");
const btnvaremo = document.getElementById("btnGuardarVaremo");
const btnRespuesta = document.getElementById("btnGuardarRespuesta");
const btnGuardar = document.getElementById("guardarPregunta");
const inpRespuesta = document.getElementById("inpRespuestas");
const idForm = localStorage.getItem("idForm");
menu();
validarSession();
mostrarFormulario();
cargarFormularios();

/**
 * Generates a dynamic form based on the data provided in the 'question' array.
 * The function creates form elements such as input fields, select dropdowns, and buttons based on the type of data provided in the array.
 *
 * @param {Array} question - An array of objects containing data for generating form elements.
 * @returns {void}
 */
function mostrarFormulario() {
  question.forEach(data => {
    switch (data.type) {
      case "text":
        $(addQuestion).append(
          `
          <label for="${data.id}" class="form-label">${data.texto}</label>
          <input type="${data.type}" class="form-control mb-2" placeholder="${data.placeholder}" id="${data.id}">
          `
        );
        break;
      case "select":
        $(addQuestion).append(
          `
        <label for="${data.id}" class="form-label">${data.texto}</label>
        <select class="form-control mb-2" id="${data.id}">
          <option selected disabled value="false">${data.placeholder}</option>
        </select>
        `
        );
        break;
      case "button":
        $(addQuestion).append(
          `
          <input type="${data.type}" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalRespuestas" value="Agregar Respuestas">
          `
        );
        break;
      case "tpselect":
        $(addQuestion).append(
          `
            <label for="${data.id}" class="form-label">${data.texto}</label>
            <select class="form-control mb-2" id="${data.id}">
              <option value="null" selected disabled>${data.placeholder}</option>
              <option value="seleccion unica" >Seleccion unica</option>
              <option value="seleccion multiple" >Seleccion multiple</option>
            </select>
            `
        );
        break;
      default:
        alert("Contacta con el administrador del sistema o equipo de desarrollo.")
        break;
    }
  })
}

const preguntaDepende = document.getElementById("dPregunta");
const respuestaDepende = document.getElementById("dRespuesta");
const selectVaremo = document.getElementById("varemo");
const agregarRespuestas = document.getElementById("agregarRespuestas");


/**
 * Loads and displays the data of a specific form from the Firestore database.
 * Populates the form with the questions, varemo options, and dependent responses based on the user's selection.
 */
function cargarFormularios() {
  onSnapshot(doc(db, "formularios", idForm), (doc) => {
    // Declaring variables used in the database
    let varemos = doc.data().varemoMedicion;
    let preguntas = doc.data().preguntas;
    let nombre = doc.data().nombre;
    let datosForm = doc.data();
    let respuestas = [];

    nameForm.innerHTML = nombre;

    modalVaremo.innerHTML = "";

    selectVaremo.innerHTML = `<option selected disabled value="false">Varemo de medicion</option>`;
    
    // Event listener for adding a response
    btnRespuesta.addEventListener("click", async (e) => {
      e.preventDefault();

      if (doc.data().preguntas.length == undefined) {
        datosForm.preguntas.push({
          respuesta: inpRespuesta.value
        });
        updateData(doc.id, datosForm, 'formularios');
        console.log('exito');
      }
    });

    if (preguntas.length > 0) {
      preguntas.forEach((data, i) => {
        $(preguntaDepende).append(
          `<option value="${i}" class="seleccionar">${data.pregunta}</option>`
        );
      });
    }

    // Varemos form
    try {
      varemos.forEach((data, i) => {
        $(selectVaremo).append(
          `<option value="${i}" class="seleccionar">${data}</option>`
        );
        $(modalVaremo).append(
          `<div class="row">
            <p class="col-sm-10">${data}</p>
            <i class="fas fa-trash red col-sm-2 eliminar" data-id="${data}"></i>
          </div>`
        );

        const eliminar = document.querySelectorAll(".eliminar");
        eliminar.forEach(btn => {
          btn.addEventListener("click", (e) => {
            updateData(idForm, { varemoMedicion: arrayRemove(e.target.dataset.id) }, "formularios");
          });
        });
      });
    } catch {
      console.log("error");
    }

    // Response dependent on question
    $(preguntaDepende).on("change", function (e) {
      const idFormPregunta = $(this).val();
      let respuestasForm = preguntas[idFormPregunta].Respuestas;

      respuestaDepende.innerHTML = "";
      respuestasForm.forEach((data, i) => {
        $(respuestaDepende).append(
          `<option value="${i}" class="seleccionar">${data}</option>`
        );
      });
    });
  });
}
btnvaremo.addEventListener("click", (e) => {
  updateData(idForm, { varemoMedicion: arrayUnion(inpVaremo.value) }, "formularios")
  inpVaremo.value = ""
})

btnGuardar.addEventListener('click', async(e)=>{
  e.preventDefault();
  const nuevaPregunta = document.getElementById('pregunta');
  const tipoDeRespuesta = document.getElementById('tpRespuesta');
  const preguntaDepende = document.getElementById('dPregunta');
  const respuestaDepende = document.getElementById('dRespuesta');
  const varemo = document.getElementById('varemo');

  const preguntas = await  getData(idForm, 'formularios');
  preguntas.data().preguntas.push({
    nuevaPregunta,
    tipoDeRespuesta,
    preguntaDepende,
    respuestaDepende,
    varemo
  })
  // updateData(idForm,{
    
  // },'formularios')
  // console.log('hola')
})

  preguntas.data().preguntas.push({
    nuevaPregunta,
    tipoDeRespuesta,
    preguntaDepende,
    respuestaDepende,
    varemo
  })
  // updateData(idForm,{
    
  // },'formularios')
  // console.log('hola')
})

