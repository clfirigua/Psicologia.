import {menu} from "../../s/hared/menu.js";

const nameForm = document.getElementById("nombreFormulario")
const localname = localStorage.getItem("Nameform") 

menu();

$(document).ready(function() {
    nameForm.innerHTML=localname;
  });
