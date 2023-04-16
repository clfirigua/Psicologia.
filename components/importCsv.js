let arrUser = [];
const usersData = [];
const userDataError = []

function parseCSV(text) {
    // Obtenemos las lineas del texto
    let lines = text.replace(/\r/g, '').split('\n');
    return lines.map(line => {
      // Por cada linea obtenemos los valores
      let values = line.split(',');
      return values;
    });
  }
  
  function reverseMatrix(matrix){
    let output = [];
    // Por cada fila
    matrix.forEach((values, row) => {
      // Vemos los valores y su posicion
      values.forEach((value, col) => {
        // Si la posición aún no fue creada
        if (output[col] === undefined) output[col] = [];
        output[col][row] = value;
      });
    });
    return output;
  }
  
  function readFile(evt) {
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      // Cuando el archivo se terminó de cargar
      let lines = parseCSV(e.target.result);
      let output = reverseMatrix(lines);
      arrUser = output[0];
      convertidor()
    };
    // Leemos el contenido del archivo seleccionado
    reader.readAsBinaryString(file);
  }

  const convertidor = () =>{
    arrUser.shift()
    arrUser.forEach((data)=>{
        const arr = data.split(';')
        if(arr.length == 6 && arr[3].includes('@')  && arr[2].length == 10){

            const userArrConver = {
              nombres: arr[0],
              apellidos: arr[1],
              telefono: arr[2],
              email: arr[3],
              cc: arr[4],
              password: arr[5],
              rol:""
            }
            usersData.push(userArrConver)
        }else{
          userDataError.push(data);
        }


    })

  }

  const exportarData =(data, fileName) =>{
    const a = document.createElement("a");
    const contenido = data,
    blob = new Blob([contenido],{type: "octect/stream"}),
    url = window.URL.createObjectURL(blob);
    a.href=url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };



  export{
    readFile,
    usersData,
    exportarData,
    userDataError
  }