const { response, request } = require("express");
const { existeProductoNombre } = require("../helpers/db-validators");
const { Producto } = require("../models");






const obtenerProductos = async(req = request, res = response) => {

    try {
        const {desde = 0, limite = 5} = req.query;
        const estado = {estado: true};
        const [total, productos ] = await Promise.all([
            Producto.countDocuments(estado),
            Producto.find(estado)
                .skip(desde)
                .limit(limite)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
        ])
        return res.json({
            total,
            productos
        });
    } catch (error) {
        console.log(error);
        return res.status(500).res({
            msg: 'Error en el servidor'
        })
    }
}

//Obtener producto por id controller
const obtenerProducto = async( req= request, res = response) => {
    try{
        const {id} = req.params;
        const productoDB = await Producto.findById(id);
        return res.json({
            productoDB,    
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'Error en el servidor'
        });
    };
};

const crearProducto = async(req = request, res = response) => {

    try{
        const { nombre , precio, descripcion, categoria} = req.body;
        const usuario = req.usuario.id;
        const data = {
            nombre,
            precio,
            usuario,
            descripcion,
            categoria
        };
        const producto = await new Producto(data);
        await producto.save();
        res.json(producto);
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'error del servidor'
        });
    }
}

const actualizarProducto = async(req = request, res = response) => {
    try{
        const {estado, ...data} = req.body;
        data.usuario = req.usuario; 
        const productoDB = await Producto.findByIdAndUpdate(id, data, {new: true});
        return res.json({
            productoDB
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
}





module.exports = {
    obtenerProductos,
    crearProducto,
    obtenerProducto,
    actualizarProducto
}