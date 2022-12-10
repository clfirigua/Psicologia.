import {menu} from "../../shared/menu.js";
import {validarSession} from "../../components/validador.js"
//import {informes} from "../../models/informes.js"
import { addData,onGetData,deleteData, getData, updateData, onSnapshot, doc, collection ,db, onGetDocument} from "../../services/crudservice.js";
import { query, where, orderBy } from "../../services/firebaseservice.js";


const filtroFormularios = query(collection(db, "formularios"), orderBy("nombre", "asc"));
const filtroUsuarios = query(collection(db, "usuarios"), orderBy("nombres", "asc"));
const formularios = document.getElementById('formularios')
const usuarios = document.getElementById('usuarios')
const tablaInformes = document.getElementById('tablaInformes')
let idFormulario
let idUsuario;
let listBaremo = [];
let listrespuestas = [];
let suma 
menu()
validarSession()
cargarFormularios()


function cargarFormularios  () {
  onSnapshot(filtroFormularios,(forms)=>{
    formularios.innerHTML = ``;
    formularios.innerHTML = `<option value="disable" selected disabled > Seleccione un formulario </option>`
    forms.forEach((doc)=>{
        $(formularios).append(`<option value="${doc.id}">${doc.data().nombre}</option>`)
    });
  })
}
formularios.addEventListener('change', (e)=>{
  idFormulario = e.target.value;
  usuariosAsignados(idFormulario)
}) 

function usuariosAsignados  (formulario) {
  const usuariosAsignados = [];
  const busqueda = query(collection(db, "asignaciones"), where("formulario", "==", formulario));
  onSnapshot(busqueda,(asignacion)=>{
    asignacion.forEach(data =>{
      if(data.data().usuario.lenght != 0){
        data.data().usuario.forEach(usuario =>usuariosAsignados.push(usuario.id));
      }else{
        console.log('Sin usuarios ');
      }
    })
  })
  cargarUsuarios(usuariosAsignados)
}

function cargarUsuarios  (usuariosAsignados) {
  onSnapshot(filtroUsuarios,(forms)=>{
    usuarios.innerHTML = ``;
    usuarios.innerHTML = `<option value="disable" selected disabled > Seleccione un usuarios </option>`
    forms.forEach((doc)=>{
      for (let i = 0; i < usuariosAsignados.length; i++) {
        if(doc.id == usuariosAsignados[i]){
          $(usuarios).append(`<option value="${doc.id}">${doc.data().nombres} ${doc.data().apellidos}</option>`)
        }
      }
      }); 
})
}
usuarios.addEventListener('change',  (e) =>{
  idUsuario = e.target.value;
  cargarResultados(idFormulario,idUsuario)
})
// function cargarusuarios
function cargarResultados(idFormulario,idUsuario){
  const formulario = onSnapshot(doc(db, "formularios", idFormulario), (doc) => {
    const baremos = doc.data().varemoMedicion;
    tablaInformes.innerHTML = ``;
    baremos.forEach((baremo) => {
    listBaremo.push(baremo.baremo);
    // console.log(baremo['desviacion']);
    $(tablaInformes).append(`
                      <tr>
                        <th scope="row">${baremo.baremo}</th>
                        <td>${baremo.media}</td>
                        <td>${baremo.desviacion}</td>
                        <td>${cargarRespuestas(idUsuario,baremo.baremo)}</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>`);
    });
  });
  
}


function cargarRespuestas(idUsuario, baremo){
  const respuestas = query(collection(db, "respuestas"), where("usuario", "==", idUsuario), where("formulario", "==", idFormulario));
  let sumaVaremo = 0;
  
  onSnapshot(respuestas,(respuestas)=>{
    let respuestasUsuario = [] ;
    respuestas.forEach(data =>{
      respuestasUsuario = data.data().respuestas;
    });

    if(respuestasUsuario.lenght == 0){
      return;
    }

    respuestasUsuario.forEach(respuesta =>{
      if(respuesta['varemo'] == baremo){
        respuesta['respuesta'].forEach((value) => {
          sumaVaremo = value + sumaVaremo;
        })
      }
    });

    console.log(baremo, sumaVaremo)

  });

 

}

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
    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15
    });
    
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "varemo",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
    
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "varemo",
      tooltip: am5.Tooltip.new(root, {
        labelText:"{valueY}"
      })
    }));
    
    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
    series.columns.template.adapters.add("fill", function(fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    
    series.columns.template.adapters.add("stroke", function(stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    
    
    // Set data
    var data = [
      {
        varemo: 'Loco',
        value:20
      },
      {
        varemo: 'Louco',
        value:40
      },
      {
        varemo: 'Lioco',
        value:80
      }
];
    
    xAxis.data.setAll(data);
    series.data.setAll(data);
    
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    
    }); // end am5.ready()