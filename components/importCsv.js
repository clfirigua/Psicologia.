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
      arrUser.pop();
      convertidor()
    };
    // Leemos el contenido del archivo seleccionado
    reader.readAsBinaryString(file);
  }

  const convertidor = () =>{

    arrUser.forEach((data)=>{
        const arr = data.split(';')
        if(arr.length == 7 && arr[3].includes('@') && arr[3].includes('.com') && arr[2].length == 10){

            const userArrConver = {
              nombres: arr[0],
              apellidos: arr[1],
              telefono: arr[2],
              email: arr[3],
              cc: arr[4],
              usuario: arr[5],
              password: arr[6],
            }
            usersData.push(userArrConver)

        }else{
          userDataError.push(data);
        }


    })

  }



  export{
    readFile,
    usersData
  }