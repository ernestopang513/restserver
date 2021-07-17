const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = (req = request, res = response) => {
    
    const {edad,page} = req.query;
    res.json({
        msg: 'get a mi API - controlador',
        edad,
        page
    });
}

const usuariosPut = (req, res = response) => {
    
    const id = req.params.id;
    res.json({
        msg: 'put a mi API - controlador',
        id
    });
}

const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});  

    // Verificar que el correo existe
    const emailExist = await Usuario.findOne({correo});
    if(emailExist){
        return res.status(400).json({
            msg: 'Ese correo ya está registrado'
        })
    }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar la base de datos
    await usuario.save();
    res.status(201).json({
        msg: 'post a mi API - constrolador',
        usuario
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete a mi API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}