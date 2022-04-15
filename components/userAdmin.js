const ModelusuariosAdmin = [ 
    {
        texto: 'Nombres',
        type: 'text',
        placeholder:'Nombres',
        required:true
    },
    {
        texto: 'Apellidos',
        type: 'text',
        placeholder:'Apellidos',
        required:true
    },
    {
        texto: 'Telefono',
        type: 'number',
        placeholder:'Telefono',
        required:true
    },
    {
        texto: 'Email',
        type: 'email',
        placeholder:'email',
        required:false
    },
    {
        texto: 'CC',
        type: 'number',
        placeholder:'CC',
        required:true
    },
    {
        texto: 'Usuario',
        type: 'text',
        placeholder:'User Name',
        required:true
    },
    {
        texto: 'Password',
        type: 'password',
        placeholder:'Contraseña',
        required:true
    },
    {
        texto: 'Rol',
        type: 'select',
        placeholder:'Selecciona un rol',
        required:true
    },


]

export{
    ModelusuariosAdmin
}