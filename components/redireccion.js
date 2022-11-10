const redireccion = (rolUser="")=>{

   let url = ''
    if (rolUser != null) {
       url = " /pages/dashboard/dashboard.html";
   }else{
     url = "/pages/formsAnswer/formAnswer.html";
   }
   return url;
}

export {redireccion}


