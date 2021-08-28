const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');



class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads'
        }
        // this.usuariosPath   = '/api/usuarios';
        // this.authPath       = '/api/auth';
        // this.categoriasPath       = '/api/categorias';
        
        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //Lectura y parseo del body
        this.app.use(express.json());
        
        //Cors
        this.app.use(cors());

        this.app.use(express.static('public'));

        //FIleupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
        
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.uploads, require('../routes/upload'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`servidor en el puerto: ${this.port}`);
        })
    }
}

module.exports = Server;