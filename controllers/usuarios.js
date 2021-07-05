const {response, request} = require('express');

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

const usuariosPost = (req, res = response) => {
    
    const body = req.body;
    res.status(201).json({
        msg: 'post a mi API - constrolador',
        body
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