import { deleteData } from "../services/crudservice.js"

//eliminar datos
const notConfirmar = ( id, collection) =>{

    Swal.fire({
        title: "Eliminar",
        text:`¿Esta seguro de eliminar?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'eliminar',
        denyButtonText: `no eliminar`,
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