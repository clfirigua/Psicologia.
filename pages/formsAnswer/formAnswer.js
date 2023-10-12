import { validarSession } from "../../components/validador.js"
import { addData, onGetData, deleteData, getData, updateData, onSnapshot, doc, collection, db } from "../../services/crudservice.js";
validarSession();
const { id } = JSON.parse(localStorage.getItem('user'));
const verform = document.getElementById('formularios');
const cerrarSesion = document.getElementById('cerrarSesion');
let idAsignacion
const url = '../../assets/img/list-2389219.png' //Imagen de <a href="https://pixabay.com/es/users/memed_nurrohmad-3307648/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2389219">Memed_Nurrohmad</a> en <a href="https://pixabay.com/es//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2389219">Pixabay</a>
const forms = [];

onGetData((asignaciones)  => {   
    asignaciones.forEach(asignacion => {
        asignacion.data().usuario.forEach(card => {
            console.log(card)
            if (card.id == id) {
                if (card.resuelto == false) {
                    console.log(card);
                    idAsignacion =asignacion.id;
                    forms.push(asignacion.data().formulario);
                }else{
                    //alert('No tienes formularios pendientes');
                    }
            }
        })
    });
    verformulario();
}, 'asignaciones');

const verformulario = () => {
    verform.innerHTML = '';
    onGetData((form) => {
        form.forEach(card => {
            if (forms.includes(card.id)) {
                $(verform).append(`
                <div class="card m-auto mb-3" style="width: 18rem;">
                <img src="${url}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${card.data().nombre}</h5>
                  <a href="#" class="btn btn-primary llenar"  data-id="${card.id}">Resolver</a>
                </div>
              </div>
                
                `)
            }
            const llenarForm = document.querySelectorAll(".llenar");
            llenarForm.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    localStorage.setItem('idformuser', e.target.dataset.id );
                    localStorage.setItem('idAsignacion', idAsignacion);
                    location.href = '../answer/answer.html';
                }
            )
            });
        })
    }, 'formularios');
}
cerrarSesion.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    location.href = '/..';
})