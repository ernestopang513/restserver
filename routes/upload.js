const {Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarArchivo, mostrarImagen } = require('../controllers/upload');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarCampos, validarArchivo } = require('../middleware');

const router = Router();

router.post('/', validarArchivo ,cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarArchivo);

router.get('/:coleccion/:id', [
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);

module.exports = router