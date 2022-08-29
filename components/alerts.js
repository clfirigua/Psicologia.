import { deleteData } from "../services/crudservice.js"

//eliminar datos
const notConfirmar = ( id, collection) =>{

    Swal.fire({
        title: "Eliminar",
        text:`¿Esta seguro de eliminar el rol?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            deleteData(id,collection)
            Swal.fire("Se elimino correctamente", "", "success");
        } else if (result.isDenied) {
          Swal.fire('No se elimino', '', 'info')
        }
      })

    
}
export{
    notConfirmar
}