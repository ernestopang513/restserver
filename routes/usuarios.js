
const {Router} = require('express');
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );
//PUT
router.put('/',  usuariosPut);
//Post
router.post('/',  usuariosPost);
//Delete
router.delete('/',  usuariosDelete);



module.exports = router;