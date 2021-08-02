const {Router, response} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.post('/login',[
    check('password', 'Password obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    validarCampos
], login)

router.post('/google',[
    check('id_token', 'El token es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn)



module.exports = router