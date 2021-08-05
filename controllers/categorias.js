const { response } = require("express");

const { Categoria } = require('../models');
// const Categoria = require("../models/categoria"); true


const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    try {
        const  categoriaDB = await Categoria.findOne({nombre});
        
        if(categoriaDB){
            return res.status(401).json({
                msg: `Ya existe la categoria: ${nombre.toLowerCase()}`
            });
        }
        
        const data = {
            nombre,
            usuario: req.usuario._id
        }
        
        const categoria = await new Categoria(data);
        await categoria.save();
        
        return res.json({
            data,
            categoria
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'mamo pero fue culpa de mongo o mongoose',
            error
        });
    }
};



module.exports = {
    crearCategoria
}