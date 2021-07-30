const jwt = require('jsonwebtoken');


const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '8h'
        }, (error, token) => {
            if( error ){
                console.log(error)
                reject('No se pudo generar el jason web token');
            }else{
                resolve(token);
            }
        })
    });

}


module.exports = {
    generarJWT
}