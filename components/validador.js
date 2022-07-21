const validarSession = async =>{
    function consulta() {
        const userLocal = JSON.parse(localStorage.getItem('user'));
        if(userLocal==null){
            window.location.replace("/")
        }   
    }
    setInterval(consulta,1000)
}

export {
    validarSession
}