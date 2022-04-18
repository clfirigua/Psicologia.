import { question } from "../../components/questions.js";
import { updateData, arrayUnion, arrayRemove, doc, db, onSnapshot } from "../../services/crudservice.js";
import { menu } from "../../shared/menu.js";

const nameForm = document.getElementById("nombreFormulario")
const localname = localStorage.getItem("Nameform")
const addQuestion = document.getElementById("añadirPreguntas")
const modalVaremo = document.getElementById("varemos");
const inpVaremo = document.getElementById("recipient-name");
const btnvaremo = document.getElementById("btnGuardarVaremo");
const idForm = localStorage.getItem("idForm");
menu();
mostrarFormulario();
cargarFormularios();

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
          <button class="btn btn-success">Agregar Respuestas</button>
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


function cargarFormularios() {
  onSnapshot(doc(db, "formularios", idForm), (doc) => {
    //declaramos variables usadas en la base de datos
    let varemos = doc.data().varemoMedicion
    let preguntas = doc.data().preguntas
    let nombre = doc.data().nombre

    // console.log(doc.data().preguntas)

    nameForm.innerHTML = nombre

    modalVaremo.innerHTML = ""


    selectVaremo.innerHTML= `<option selected disabled value="false">Varemo de medicion</option>`
    //si depende de alguna pregunta

    preguntas.forEach((data,i) => {
      $(preguntaDepende).append(
        `
          <option value="${i}" class="seleccionar" >${data.pregunta}</option>
          `
      )
    })

    //varemos form
    varemos.forEach((data,i) => {
      $(selectVaremo).append(
        `
          <option value="${i}" class="seleccionar" >${data}</option>
          `
      )
    })

        // respuesta dependiente
    $(preguntaDepende).on("change", function (e) {
      
      const idFormPregunta = $(this).val();
      let respuestasForm = preguntas[idFormPregunta].Respuestas;

      respuestaDepende.innerHTML=""
      respuestasForm.forEach((data,i) => {

        $(respuestaDepende).append(
          `
            <option value="${i}" class="seleccionar" >${data}</option>
            `
        )
      })
    })

    //varemos
    try {
      varemos.forEach(data => {
        $(modalVaremo).append(
          `
      <div class="row">
        <p class="col-sm-10">${data}</p>
        <i class="fas fa-trash red col-sm-2 eliminar" data-id="${data}" ></i>
      </div>

      `
        )
        const eliminar = document.querySelectorAll(".eliminar");
        eliminar.forEach(btn => {
          btn.addEventListener("click", (e) => {

            updateData(idForm, { varemoMedicion: arrayRemove(e.target.dataset.id) }, "formularios")
          })
        })
      })
    }
    catch {
      //alert("sin varemos ")
    }
  })
}
btnvaremo.addEventListener("click", (e) => {
  updateData(idForm, { varemoMedicion: arrayUnion(inpVaremo.value) }, "formularios")
  inpVaremo.value = ""
})


