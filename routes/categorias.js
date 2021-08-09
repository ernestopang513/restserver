const {Router, response} = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizatCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { validarJWT,validarCampos, adminRole } = require('../middleware');


const router = Router();


//Obtener todas las categorias - servicio publico
router.get('/', obtenerCategorias);


router.get('/:id',  [
    check('id', 'No es un mongo id').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
] , obtenerCategoria);



//Crear categoria - privado - cualquiera con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
] , crearCategoria);
//Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un MongoId').isMongoId(),
    check('nombre', 'El nombre es oblicagorio').notEmpty(),
    check('nombre', 'Palabras de 3 a 15 caracteres').isLength({min: 3, max: 15}),
    validarCampos
], actualizatCategoria);
//Delete - privado - solo admin_role
router.delete('/:id', [
    validarJWT,
    adminRole,
] ,eliminarCategoria);


module.exports = router