
const {Router} = require('express');
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost } = require('../controllers/usuarios');

const { check } = require('express-validator');
const { esRoleValido, emailValido, existeID } = require('../helpers/db-validators');
// const { validarCampos } = require('../middleware/validar-campos');
// const { validarJWT } = require('../middleware/validar-jwt');
// const { adminRole, tieneRole } = require('../middleware/validar-roles');

const {
    validarCampos,
    validarJWT,
    adminRole,
    tieneRole
} = require('../middleware');

const router = Router();


router.get('/', usuariosGet );
//PUT
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeID),
    validarCampos    
],  usuariosPut);
//Post
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe contener mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailValido),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);
//Delete
router.delete('/:id', [
    validarJWT,
    // adminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeID),
    validarCampos
], usuariosDelete);



module.exports = router;
