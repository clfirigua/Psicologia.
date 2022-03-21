const Modelusuarios = [ 
    {
        texto: 'nombres',
        type: 'text',
        placeholder:'Nombres',
        required:true
    },
    {
        texto: 'apellidos',
        type: 'text',
        placeholder:'Apellidos',
        required:true
    },
    {
        texto: 'telefono',
        type: 'number',
        placeholder:'Telefono',
        required:true
    },
    {
        texto: 'email',
        type: 'email',
        placeholder:'email',
        required:false
    },
    {
        texto: 'cc',
        type: 'number',
        placeholder:'CC',
        required:true
    },
    {
        texto: 'usuario',
        type: 'text',
        placeholder:'User Name',
        required:true
    },
    {
        texto: 'password',
        type: 'password',
        placeholder:'Contraseña',
        required:true
    },

]


// 'rol',
export{
    Modelusuarios
}