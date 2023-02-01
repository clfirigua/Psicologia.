import { menu } from "../../shared/menu.js";
import { validarSession } from "../../components/validador.js"
//import {informes} from "../../models/informes.js"
import { addData, onGetData, deleteData, getData, updateData, onSnapshot, doc, collection, db, onGetDocument } from "../../services/crudservice.js";
import { query, where, orderBy, arrayRemove } from "../../services/firebaseservice.js";


const filtroFormularios = query(collection(db, "formularios"), orderBy("nombre", "asc"));
const filtroUsuarios = query(collection(db, "usuarios"), orderBy("nombres", "asc"));
const formularios = document.getElementById('formularios');
const usuarios = document.getElementById('usuarios');
const tablaInformes = document.getElementById('tablaInformes');
const exportar = document.getElementById('exportar');
let idFormulario;
let idUsuario;
var listBaremo = [];
let z, t;

menu()
validarSession()
cargarFormularios()


function cargarFormularios() {
  onSnapshot(filtroFormularios, (forms) => {
    formularios.innerHTML = ``;
    formularios.innerHTML = `<option value="disable" selected disabled > Seleccione un formulario </option>`
    forms.forEach((doc) => {
      $(formularios).append(`<option value="${doc.id}">${doc.data().nombre}</option>`)
    });
  })
}
formularios.addEventListener('change', (e) => {
  idFormulario = e.target.value;
  usuariosAsignados(idFormulario)
})

function usuariosAsignados(formulario) {
  const usuariosAsignados = [];
  const busqueda = query(collection(db, "asignaciones"), where("formulario", "==", formulario));
  onSnapshot(busqueda, (asignacion) => {
    asignacion.forEach(data => {
      if (data.data().usuario.lenght != 0) {
        data.data().usuario.forEach(usuario => usuariosAsignados.push(usuario.id));
      } else {
        console.log('Sin usuarios ');
      }
    })
  })
  cargarUsuarios(usuariosAsignados)
}

function cargarUsuarios(usuariosAsignados) {
  onSnapshot(filtroUsuarios, (forms) => {
    usuarios.innerHTML = ``;
    usuarios.innerHTML = `<option value="disable" selected disabled > Seleccione un usuarios </option>`
    forms.forEach((doc) => {
      for (let i = 0; i < usuariosAsignados.length; i++) {
        if (doc.id == usuariosAsignados[i]) {
          $(usuarios).append(`<option value="${doc.id}">${doc.data().nombres} ${doc.data().apellidos}</option>`)
        }
      }
    });
  })
}
usuarios.addEventListener('change', (e) => {
  idUsuario = e.target.value;
  cargarResultados(idFormulario, idUsuario)
})
// function cargarusuarios
function cargarResultados(idFormulario, idUsuario) {
  const formulario = onSnapshot(doc(db, "formularios", idFormulario), (doc) => {


    const baremos = doc.data().varemoMedicion;
    tablaInformes.innerHTML = ``;
    baremos.forEach((baremo,index) => {

      cargarRespuestas(idUsuario, baremo.baremo).then((result) => {

        z = (result.suma - baremo.media) / baremo.desviacion;
        t = (z * 10) + 50
        listBaremo.push({
          baremo: baremo.baremo,
          t: t
        });
        $(tablaInformes).append(`
      <tr>
        <th scope="row">${baremo.baremo}</th>
        <td>${baremo.media}</td>
        <td>${baremo.desviacion}</td>
        <td>${result.suma}</td>
        <td>${z.toFixed(2)}</td>
        <td>${t.toFixed(2)}</td>
      </tr>`);
      
      if (index == baremos.length-1) {
        grafica(listBaremo)
      }
      })

    });

  });  
}


function cargarRespuestas(idUsuario, baremo) {
  return new Promise((resolve, reject) => {
    const respuestas = query(collection(db, "respuestas"), where("usuario", "==", idUsuario), where("formulario", "==", idFormulario));
    let sumaVaremo = 0;

    onSnapshot(respuestas, (respuestas) => {
      let respuestasUsuario = [];
      respuestas.forEach(data => {
        respuestasUsuario = data.data().respuestas;
      });

      if (respuestasUsuario.lenght == 0) {
      }

      respuestasUsuario.forEach(respuesta => {
        if (respuesta['varemo'] == baremo) {
          respuesta['respuesta'].forEach((value) => {
            sumaVaremo = value + sumaVaremo;
          })
        }
      });
      resolve({ baremo: baremo, suma: sumaVaremo });
    });
  });
}
exportar.addEventListener('clic', ()=>{
  
})

 function  grafica  (list = [""]) {

    am5.ready(function() {

      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      var root = am5.Root.new("chartdiv");
            
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);    

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX:true
      }));
      
      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);
        
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
          var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
              categoryField: "baremo",
              renderer: am5xy.AxisRendererX.new(root, {}),
            })
          );

      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {})
      }));
           
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      var series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "baremo",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "t",
        categoryXField: "baremo",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{categoryX}: {valueY}"
        })
      }));
        
      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));
      
      // Set data
      var data = list
      xAxis.data.setAll(data);
      series.data.setAll(data);

      //create bullets
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX:undefined,
          sprite: am5.Circle.new(root, {
            radius: 4,
            fill: series.get("fill")
          })
        })
      });
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);
      chart.appear(1000, 100);
      });

}