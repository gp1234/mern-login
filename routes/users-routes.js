const express = require('express');
const router = express.Router();

const {
    check,
} = require("express-validator");

const userController = require('../controllers/user-controller');


router.post("/register", [check('name', 'El nombre es requerido').not().isEmpty(), check('email', 'Por favor incluir un email válido').isEmail(), check('password', 'Entrar una contraseña válida').isLength({min:6})],userController.register )

router.post('/login', [check('email', 'Por favor incluir un email válido').isEmail(), check('password', 'Contraseña requerida').exists()],userController.login)

module.exports = router;