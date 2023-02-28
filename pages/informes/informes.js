import { menu } from "../../shared/menu.js";
import { validarSession } from "../../components/validador.js"
//import {informes} from "../../models/informes.js"
import { addData, onGetData, deleteData, getData,getDoc, updateData, onSnapshot, doc, collection, db, onGetDocument } from "../../services/crudservice.js";
import { query, where, orderBy, arrayRemove } from "../../services/firebaseservice.js";
window.jsPDF = window.jspdf.jsPDF;

const filtroFormularios = query(collection(db, "formularios"), orderBy("nombre", "asc"));
const filtroUsuarios = query(collection(db, "usuarios"), orderBy("nombres", "asc"));
const formularios = document.getElementById('formularios');
const usuarios = document.getElementById('usuarios');
const tablaInformes = document.getElementById('tablaInformes');
const exportar = document.getElementById('exportar');
const pdf = document.getElementById('exportarPdf');
let idFormulario;
let idUsuario;
let formularioSeleccionado = false
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
  formularioSeleccionado = true
})

function usuariosAsignados(formulario) {
  const usuariosAsignados = [];
  const busqueda = query(collection(db, "asignaciones"), where("formulario", "==", formulario));
  onSnapshot(busqueda, (asignacion) => {
    asignacion.forEach(data => {
      if (data.data().usuario.length != 0) {
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
  onSnapshot(doc(db, "formularios", idFormulario), (doc) => {


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
        grafica({data:listBaremo})
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


exportar.addEventListener("click", () => {
  let datosRespuestas = []
  if (formularioSeleccionado) {
    const q = query(collection(db, "respuestas"), where("formulario", "==", idFormulario))
    onSnapshot(q,(querySnapshot)=>{
      // obtener los nombres de las columnas
      let columns = [];
      const firstDoc = querySnapshot.docs[1].data();
      // console.log(querySnapshot.docs[1].data());
      Object.keys(firstDoc.respuestas).forEach((key) => {
        columns.push(key);
        datosRespuestas.push(firstDoc.respuestas[parseInt(key)].respuesta)
        // console.log(firstDoc.respuestas[parseInt(key)].respuesta);
      });

      // crear un arreglo para almacenar los datos de cada fila
      let rows = [];

      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const row = {
          Usuario: docData.usuario,
          Respuestas: datosRespuestas
        };
        console.log(row);
        Object.keys(docData.respuestas).forEach((key) => {
          row[key] = docData.respuestas[key];
        });
        rows.push(row);
        console.log(rows);
      });

      // crear un objeto de libro de Excel
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(rows, { header: columns });
      XLSX.utils.book_append_sheet(workbook, worksheet, "Respuestas");

      // descargar el archivo Excel
      // const filename = `respuestas_formulario_${idFormulario}.xlsx`;
      // XLSX.writeFile(workbook, filename);
    })
    // getDoc(
    //   collection(db, "respuestas"),
    //   where("formulario", "==", idFormulario)
    // ).then((querySnapshot) => {
//15, 15, { 'width': 170 }
    // });
  }
});

// pdf.addEventListener("click", ()=>{
//   const doc = new jsPDF();
//   doc.html(document.documentElement, { callback: function () {
//     // Guarda el documento PDF con el nombre "documento.pdf"
//     doc.save("documento.pdf");
//   },});
//   //doc.save("prueba.pdf")

// })

 function  grafica  (list) {
  // var data = []
  // data = list

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
      console.log(list);
      var data = list.data || [];
      xAxis.data.setAll(data);
      series.data.setAll(data);
      // chart.xAxes.getIndex(0).data.setAll(data);
      // chart.series.getIndex(0).data.setAll(data);

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