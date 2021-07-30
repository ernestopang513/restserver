const { response, request } = require("express");
const Usuario = require("../models/usuario");

const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");

const login = async(req = request, res = response) =>{

    const {password, correo} = req.body;
    try {

        //Verificar si el usuario existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: 'El correo / password fue incorrecto = correo',
            });
        };
        //verificar que el usuario este activo 
        if(!usuario.estado ){
            return res.status(400).json({
                msg: 'El correo / password fue incorrecto = estado false'
            });
        };

        //Verificar contraseña 
        const passwordCheck = bcrypt.compareSync(password, usuario.password);
        if(!passwordCheck){
            res.status(400).json({
                msg: 'El correo / password fue incorrecto = pasword'
            });
        }

        //Generar el token
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

    
};

module.exports = {
    login,
}