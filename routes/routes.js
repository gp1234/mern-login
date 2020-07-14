const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    check,
    validationResult
} = require("express-validator");
const auth = require('../middleware/auth');
const User = require('../models/User');
const colors = require('colors');


// @route POST 
router.post("/register", [check('name', 'El nombre es requerido').not().isEmpty(), check('email', 'Por favor incluir un email válido').isEmail(), check('password', 'Entrar una contraseña válida').isLength({min:6})], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

    const {name,email,password} = req.body;


    try {
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({errors: [ { msg: 'Usuario ya existe pana'}]})
        }
        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password,salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.jwtSecret, {expiresIn: 36000}, (err,token) => {
            if(err) throw err;
            res.json({token})
        });
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }


})

router.post('/login', [check('email', 'Por favor incluir un email válido').isEmail(), check('password', 'Contraseña requerida').exists()], async (req,res) => {

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({errors: [{ masg: 'Usuario no existe'}]})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({errors: [{ masg: 'Usuario no existe'}]})
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.jwtSecret, {expiresIn: 36000}, (err,token) => {
            if(err) throw err;
            res.json({token})
        });
    }
    catch(err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

})



router.get('/protectedRoute', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch(err) {
        console.error(err.message.red);
        res.status(500).send('Server error');
    }
})


module.exports = router;