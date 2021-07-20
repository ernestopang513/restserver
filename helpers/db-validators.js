const Usuario = require('../models/usuario');
const Role = require('../models/role');



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
    existeID
}