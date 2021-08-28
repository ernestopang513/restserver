const { v4: uuidv4 } = require('uuid');
const path = require('path');



const subirArchivo = (files,extensionesValidas = ['png', 'jpg', 'jpge', 'gif'],  carpeta = '') =>  {

    return new Promise((resolve, reject) => {
        const {archivo} = files;   
        const nombreCortado = archivo.name.split('.');
        let extension = nombreCortado[nombreCortado.length - 1];
        extension = extension.toLowerCase();
        //validar extensiones 
        // const extensionesValidas = 
        if(!extensionesValidas.includes(extension)){
          return reject(`La extension ${extension} no es permitida, las extensiones permitidas son ${extensionesValidas}`);
        };
    
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath =path.join( __dirname , '../uploads/',carpeta , nombreTemp);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            return reject(err);
          }
          return resolve(nombreTemp);
        });
    })
}


module.exports = {
    subirArchivo
}