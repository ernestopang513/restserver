
const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );
//PUT
router.put('/:id',  usuariosPut);
//Post
router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
], usuariosPost);
//Delete
router.delete('/',  usuariosDelete);



module.exports = router;