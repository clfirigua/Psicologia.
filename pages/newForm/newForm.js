import {question} from "../../components/questions.js";
import {menu} from "../../shared/menu.js";

const nameForm = document.getElementById("nombreFormulario")
const localname = localStorage.getItem("Nameform") 
const addQuestion = document.getElementById("añadirPreguntas")
menu();

$(document).ready(function() {
    nameForm.innerHTML=localname;
  });
question.forEach(data =>{
  if(data.type == 'select'){
    
  }if(data.type == 'button'){

  }
  else{
    
  }
  switch(data.type){
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
        <option selected disabled>${data.placeholder}</option>
      </select>
      `
    );
    break;
    case "button":
      $(addQuestion).append(
        ` 
        <button></button>
        `
      );
      break;

  }
})