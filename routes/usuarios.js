
const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost } = require('../controllers/usuarios');
const { esRoleValido, emailValido, existeID } = require('../helpers/db-validators');
const { validarCampos } = require('../middleware/validar-campos');

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
router.delete('/:id',  usuariosDelete);



module.exports = router;
