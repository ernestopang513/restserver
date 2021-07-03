const {response} = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'get a mi API - controlador'
    });
}

const usuariosPut = (req, res = response) => {
    res.json({
        msg: 'put a mi API - controlador'
    });
}

const usuariosPost = (req, res = response) => {
    res.status(201).json({
        msg: 'post a mi API - constrolador'
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