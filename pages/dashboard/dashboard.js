import { menu } from "../../shared/menu.js"
import { validarSession } from "../../components/validador.js"
import { addData, onGetData, deleteData, getData, updateData, onSnapshot, doc, collection, db } from "../../services/crudservice.js";

menu();
validarSession();

const graficos = document.getElementById('graficos');


onGetData((data) => {
    graficos.innerHTML = '';
    data.forEach(async (usuario) => {
        let resultos = 0;
        let faltantes = 0;
        if (usuario.data().usuario.length != 0) {
            usuario.data().usuario.forEach(data => data.resuelto ? resultos++ : faltantes++);
        } else { return }
        onGetData((informe) => { 
            informe.forEach(data =>{
                if(data.id == usuario.data().formulario){
                    $(graficos).append(`
                    <div class="card mt-3 ml-3" >
                        <div class="card-body">
                        <h5 class="card-title text-center">${data.data().nombre}</h5>
                            <div id="${usuario.id}" class="chartdiv"></div>
                        </div>
                    </div>
                `);
                var root = am5.Root.new(usuario.id);
        
                root.setThemes([
                    am5themes_Animated.new(root)
                ]);
        
                var chart = root.container.children.push(am5percent.PieChart.new(root, {
                    startAngle: 180,
                    endAngle: 360,
                    layout: root.verticalLayout,
                    innerRadius: am5.percent(50)
                }));
        
                var series = chart.series.push(am5percent.PieSeries.new(root, {
                    startAngle: 180,
                    endAngle: 360,
                    valueField: "value",
                    categoryField: "category",
                    alignLabels: false
                }));
        
                series.states.create("hidden", {
                    startAngle: 180,
                    endAngle: 180
                });
        
                series.slices.template.setAll({
                    cornerRadius: 5
                });
        
                series.ticks.template.setAll({
                    forceHidden: true
                });
        
                series.data.setAll([
                    { value: resultos, category: "Llenado" },
                    { value: faltantes, category: "Faltante" },
                ]);
        
                series.appear(1000, resultos + faltantes);
                }
            })
        },'formularios')

    });
}, 'asignaciones')
