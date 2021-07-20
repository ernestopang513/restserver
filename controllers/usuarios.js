const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req = request, res = response) => {
    
    // const {edad,page} = req.query;
    const {desde =  0,limite = 5} = req.query;
    // const usuarios = await Usuario.find()
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);
    const query = {estado : true};
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async(req, res = response) => {
    
    const {id} = req.params;
    const {_id,password, google,correo,...resto} = req.body;
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto,{new: true});
    res.json(usuario);
}

const usuariosPost = async(req, res = response) => {
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
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

const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}