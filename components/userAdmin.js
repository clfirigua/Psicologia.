const ModelusuariosAdmin = [
    {
        texto: 'Nombres',
        type: 'text',
        placeholder: 'Nombres',
        required: true
    },
    {
        texto: 'Apellidos',
        type: 'text',
        placeholder: 'Apellidos',
        required: true
    },
    {
        texto: 'Telefono',
        type: 'number',
        placeholder: 'Telefono',
        required: true
    },
    {
        texto: 'Email',
        type: 'email',
        placeholder: 'email',
        required: true
    },
    {
        texto: 'CC',
        type: 'number',
        placeholder: 'CC',
        required: true
    },
    {
        texto: 'Password',
        type: 'password',
        placeholder: 'Contraseña',
        required: true
    },
    {
        texto: 'Rol',
        type: 'select',
        placeholder: 'Selecciona un rol',
        required: true
    },


]

const editarusuarios = (obj) => {
    const nombre = document.getElementById('Nombres');
    const apellido = document.getElementById('Apellidos');
    const telefono = document.getElementById('Telefono');
    const email = document.getElementById('Email');
    const cc = document.getElementById('CC');
    const password = document.getElementById('Password');
    const rol = document.getElementById('Rol');
    nombre.value = obj.nombres;
    apellido.value = obj.apellidos;
    telefono.value = obj.telefono;
    email.value = obj.email;
    cc.value = obj.cc;
    password.value = obj.password;
    rol.value = obj.rol;
}
export {
    ModelusuariosAdmin,
    editarusuarios
}