const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerCategoria } = require("../controllers/categorias");
const { obtenerProductos, crearProducto, obtenerProducto, actualizarProducto, eliminarProducto } = require("../controllers/productos");
const { existeProductoId, existeProductoNombre, existeCategoria } = require("../helpers/db-validators");
const { validarJWT, validarCampos, adminRole } = require("../middleware");









const router = Router();

//Obtener usuario
router.get('/', obtenerProductos);

//Obtener producto por id 
router.get('/:id', [
    check('id', 'El id es obligatorio').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
] ,obtenerProducto);

//Crear producto 
router.post('/', [
    validarJWT,
    check('nombre').notEmpty(),
    check('categoria', 'Es un mongo id invalido').isMongoId(),
    check('categoria').custom(existeCategoria),
    check('nombre').custom(existeProductoNombre),
    validarCampos
] ,crearProducto);


//Editar la información de un producto
router.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoId),
    check('categoria','El id de la categaria no es valido').isMongoId(),
    validarCampos
] , actualizarProducto);


//Eliminar productos (estado: false)
router.delete('/:id', [
    validarJWT,
    adminRole,
    check('id', 'Es un mongo id invalido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
] , eliminarProducto);



module.exports = router;