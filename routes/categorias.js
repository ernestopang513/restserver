const {Router, response} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();


//Obtener todas las categorias - servicio publico
router.get('/', (req, res = response) => {
    res.json({
        msg: 'get'
    })
})
router.get('/:id', (req, res = response) => {
    res.json({
        msg: 'get :id'
    })
})
//Crear categoria - privado - cualquiera con token valido
router.post('/', (req, res = response) => {
    res.json({
        msg: 'post'
    })
});
//Actualizar - privado - cualquiera con token valido
router.put('/:id', (req, res = response) => {
    res.json({
        msg: 'put'
    })
});
//Delete - privado - solo admin_role
router.delete('/:46546asdf', (req, res = response) => {
    res.json({
        msg: 'Estado en false'
    });
});


module.exports = router