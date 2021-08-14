const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerCategoria } = require("../controllers/categorias");
const { obtenerProductos, crearProducto, obtenerProducto } = require("../controllers/productos");
const { existeProductoId, existeProductoNombre } = require("../helpers/db-validators");
const { validarJWT, validarCampos } = require("../middleware");









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
    check('categoria').isMongoId(),
    check('nombre').custom(existeProductoNombre),
    validarCampos
] ,crearProducto);


//Editar la información de un producto
// router.put('/',)




module.exports = router;