const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias'
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
        
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`servidor en el puerto: ${this.port}`);
        })
    }
}

module.exports = Server;