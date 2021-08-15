const Usuario = require('../models/usuario');
const Role = require('../models/role');
const { Categoria, Producto } = require('../models');



const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la DB`);
    }
}

const emailValido = async(correo = '') => {
    const emailExist = await Usuario.findOne({correo});
    if(emailExist){
        throw new Error(`El email: ${correo} ya está registrado`);
    }
}
const existeID = async(id = '') => {
    const idExist = await Usuario.findById(id);
    if(!idExist){
        throw new Error(`El id: ${id} no se logro encontrar`);
    }
}
const existeCategoria = async(id='') => {
    const categoriaExiste = await Categoria.findById(id);
    if(!categoriaExiste){
        throw new Error('Esta categoria no existe id sin encontrar');
    };
}
const existeProductoId = async(id='') => {
    const categoriaExiste = await Producto.findById(id);
    if(!categoriaExiste){
        throw new Error('Este producto no existe id sin encontrar');
    };
}


const existeProductoNombre = async(nombre = '' ) => {
    const nombreDB = await Producto.findOne({nombre});
        if(!!nombreDB){
            throw new Error('El producto ingresado ya existe');
        }
}
const existeCategoriaNombre = async(nombre = '' ) => {
    const nombreDB = await Categoria.findOne({nombre: nombre.toUpperCase()});
        if(!!nombreDB){
            throw new Error('La categoria ingresada ya existe');
        }
}

// // Verificar que el correo existe
// const emailExist = await Usuario.findOne({correo});
// if(emailExist){
//     return res.status(400).json({
//         msg: 'Ese correo ya está registrado'
//     })
// }


module.exports = {
    esRoleValido,
    emailValido,
    existeID,
    existeCategoria,
    existeProductoId,
    existeProductoNombre,
    existeCategoriaNombre
}