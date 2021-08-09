const { response, request } = require("express");

const { Categoria } = require('../models');
// const Categoria = require("../models/categoria"); true


const obtenerCategorias = async(req = request, res = response) => {

    try {
        const {desde = 0,limite=10} = req.query;
        const estado = { estado: true};
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(estado),
            Categoria.find(estado)
            .skip(Number(desde))
            .limit(Number(limite))
            // .populate('usuario')
        ]);
        return res.json({
            total,
            categorias
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
}

//Obtener categoria por id
const obtenerCategoria  = async(req, res = response) => {

    try {
        
        const {id} = req.params;
        console.log(id)
        const cat = await Categoria.findById(id)
        .populate('usuario');

        if(!cat){
            return res.status(404).json({
                msg: 'No hay categoria con ese id'
            });
        }
        return res.json({
            msg: `Si hay categoria con el nombre de ${id} y el creador fue el usuario: ${cat.usuario.nombre}`,
            cat
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error del servidor'
        })
    }

}


const crearCategoria = async(req, res = response) => {

    
    try {
        const nombre = req.body.nombre.toUpperCase();
        const  categoriaDB = await Categoria.findOne({nombre});
        
        if(categoriaDB){
            return res.status(401).json({
                msg: `Ya existe la categoria: ${nombre.toLowerCase()}`
            });
        }
        
        const data = {
            nombre,
            usuario: req.usuario._id
        };
        
        const categoria = await new Categoria(data);
        await categoria.save();
        
        return res.json({
            data,
            categoria
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'mamo pero fue culpa de mongo o mongoose'
        });
    }
};


const actualizatCategoria = async(req, res = response) => {

    try {
        const {id} = req.params;
        const nombre = req.body.nombre.toUpperCase();
        const usuario = req.usuario._id;
        if(!nombre){
            return res.status(401).json({
                msg: 'El nombre es obligatorio'
            });
        }
        const data = {nombre, usuario };
        const nombresDB = await Categoria.findOne({nombre});
        if(nombresDB){
            return res.status(401).json({
                msg: 'Lo siento ese nombre ya esta en la Base de datos'
            })
        }
        const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
        return res.json({
            id,
            categoria,
            usuario,
            nombresDB
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error en el servidor'
        })
    }
};
const eliminarCategoria = async(req, res = response) => {

    try {
        const {id} = req.params;
        const data = {estado: false};
        const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

        return res.json({
            id,
            categoria
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error en el servidor'
        })
    }
};



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizatCategoria,
    eliminarCategoria,
}