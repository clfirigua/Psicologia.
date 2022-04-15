
const notConfirmar = (title, body, callback) =>{
    
    Swal.fire({
        title: title,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Comfirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            callback
        } else if (result.isDenied) {
            
        }
      })

    
}
export{
    notConfirmar
}