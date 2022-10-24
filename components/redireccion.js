const redireccion = (rolUser="")=>{

   let url = ''
    if (rolUser != null) {
       url = "../pages/dashboard/dashboard.html";
   }else{
     url = "../pages/formsAnswers/formsAnswers.html";
   }
   return url;
}

export {redireccion}


