import { updateData, doc, db, onSnapshot, getData, onGetDocument } from "../../services/crudservice.js";
import { menu } from "../../shared/menu.js";
import {validarSession} from "../../components/validador.js"

const idFormulario = localStorage.getItem('idForm');

const inptPregunta = document.getElementById('pregunta');
const inptNombreBaremo = document.getElementById('baremoName');
const inptMediaBaremo = document.getElementById('baremoMedia');
const inptDEBaremo = document.getElementById('baremoDE');
const inptNombreRespuesta = document.getElementById('inpRespuestas');

const selectTipoRespuesta = document.getElementById('tpRespuesta');
const selectPreguntaDepende = document.getElementById('dPregunta');
const selectRespuestaDepende = document.getElementById('dRespuesta');
const selectBaremo = document.getElementById('varemo');

const btnGuardarPregunta = document.getElementById('guardarPregunta');
const btnGuardarBaremo = document.getElementById('btnGuardarVaremo');
const btnGuardarRespuesta = document.getElementById('btnGuardarRespuesta');
const btnModalRespuestas = document.getElementById('modalRespuestas');

const divBaremos = document.getElementById('varemos');
const divRespuestas = document.getElementById('containerRespuestas');
const divPreguntas = document.getElementById('targetPreguntas');



let Preguntas = [];
let varemos = [];
let respuestas = [];
let idUpdate = '';

const databaremo = () =>{
  return {
    baremo:inptNombreBaremo.value,
    media:inptMediaBaremo.value,
    desviacion: inptDEBaremo.value
  }
}

const dataForm = () => {
  return {
    nombrePregunta: inptPregunta.value,
    tipoDeRespuesta: selectTipoRespuesta.value,
    preguntaDepende: selectPreguntaDepende.value,
    respuestaDepende: selectRespuestaDepende.value,
    varemo: selectBaremo.value,
    respuestas: []
  }
}

const dataBd = (nombrePregunta, tipoDeRespuesta, preguntaDepende, respuestaDepende, varemo) => {
  inptPregunta.value = nombrePregunta;
  selectTipoRespuesta.value = tipoDeRespuesta;
  selectPreguntaDepende.value = preguntaDepende;
  selectRespuestaDepende.value = respuestaDepende;
  selectBaremo.value = varemo;
}

const generarVaremos = (varemos = []) => {
  divBaremos.innerHTML = '';
  selectBaremo.innerHTML = '<option value="false">Varemo de medicion</option>';

  if (varemos.length === 0) {
    $(divBaremos).append(`
      <p>Sin baremos Cargados</p>
    `);
    return
  }
  varemos.forEach((varemo,index) => {
    console.log(varemo,index);
    $(selectBaremo).append(`
      <option value="${varemo.baremo}">${varemo.baremo}</option>
    `);
    console.log(index);
    // <p>${varemo.baremo}</p>
    $(divBaremos).append(`
      <tr>
      <th scope="row">${varemo.baremo}</th>
      <td>${varemo.media}</td>
      <td>${varemo.desviacion}</td>
      <td><input type="button" class="btn btn-danger mt-2 eliminar" data-id="${index}" value="Eliminar"></td>
    </tr>
    `);
        const eliminar = document.querySelectorAll(".eliminar");
    eliminar.forEach(btn => {
      btn.addEventListener('click', (e) => {

        console.log(varemos.splice(e.target.dataset.id, 1));
        // updateData(idFormulario, { varemoMedicion: varemos }, 'formularios');


      })
    });
  });

}

const mostrarRespuestas = (respuestas = []) => {
  divRespuestas.innerHTML = '';
  respuestas.forEach(element => {
    $(divRespuestas).append(`
         <p>${element}</p>
      `);
  });
}

const generarTargetas = (preguntas) => {

  if (preguntas.length === 0) {
    $(divPreguntas).append(`
      <p>Sin Preguntas Guardadas</p>
    `);
    return
  }

  divPreguntas.innerHTML = '';

  preguntas.forEach((pregunta, index) => {

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
          <input type="button" class="btn btn-primary mt-2 editar" data-id="${index}"value="Editar">
          <input type="button" class="btn btn-danger mt-2 eliminar" data-id="${index}" value="Eliminar">
        </div>
    `);

    const list = document.getElementById(index);
    pregunta.respuestas.forEach((respuesta, index) => {
      $(list).append(`
        <li class="list-group-item">${index + 1}. ${respuesta}</li>
      `);
    });

    const eliminar = document.querySelectorAll(".eliminar");
    eliminar.forEach(btn => {
      btn.addEventListener('click', (e) => {

        Preguntas.splice(e.target.dataset.id, 1);
        updateData(idFormulario, { preguntas: Preguntas }, 'formularios');


      })
    });
    const editar = document.querySelectorAll('.editar');
    editar.forEach(btn => {

      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        const { nombrePregunta, preguntaDepende, respuestaDepende, tipoDeRespuesta, varemo } = preguntas[id];

        respuestas = preguntas[id].respuestas;
        selecPreguntadepende(false, id, respuestas);
        dataBd(nombrePregunta, tipoDeRespuesta, preguntaDepende, respuestaDepende, varemo);
        mostrarRespuestas(respuestas);
        btnGuardarPregunta.value = 'Actualizar'
        idUpdate = id;


      })
    });

  })


}

const generarPreguntas = (preguntas = []) => {
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

    generarPreguntas(Preguntas)
    generarTargetas(Preguntas);
    generarVaremos(varemos);

  })
}

btnGuardarPregunta.addEventListener('click', (event) => {

  if (idUpdate == '') {
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
  } else {
    Preguntas[idUpdate]=dataForm();
    Preguntas[idUpdate].respuestas = respuestas;
    updateData(idFormulario, { preguntas: Preguntas }, 'formularios');
    respuestas = [];
    divRespuestas.innerHTML = '';
  }

})

btnGuardarBaremo.addEventListener('click', (event) => {
  const baremoTerminado = databaremo()
  varemos.push(baremoTerminado);
  inptNombreBaremo.value = "";
  inptDEBaremo.value="";
  inptMediaBaremo.value="";
  updateData(idFormulario, { varemoMedicion: varemos }, 'formularios');

})

btnGuardarRespuesta.addEventListener('click', (event) => {

  respuestas.push(inptNombreRespuesta.value);
  inptNombreRespuesta.value = '';
  divRespuestas.innerHTML = '';

  mostrarRespuestas(respuestas)


})


$(selectPreguntaDepende).on("change", function (e) {

  selecPreguntadepende(true, $(this).val());

})
const selecPreguntadepende = (tipo, id, repuestas = []) => {
  selectRespuestaDepende.innerHTML = "";

  if (tipo == true) {
    let respuestasForm = Preguntas[id].respuestas;
    respuestasForm.forEach((data, i) => {
      $(selectRespuestaDepende).append(
        `
          <option value="${i}" class="seleccionar" >${data}</option>
          `
      )
    }
    )
  } else {
    repuestas.forEach((data, i) => {
      $(selectRespuestaDepende).append(
        `
          <option value="${i}" class="seleccionar" >${data}</option>
          `
      )
    }
    )
  }
}


$(document).ready(function () {

  menu();
  validarSession();
  cargarDatosForm();


});