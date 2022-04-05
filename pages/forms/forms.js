import {menu} from "../../shared/menu.js"

const btn = document.getElementById('newForm');

menu()


btn.addEventListener('click', (event)=>{
    event.preventDefault();
    location.href ='../newForm/newForm.html';
})