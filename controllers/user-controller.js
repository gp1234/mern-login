const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const colors = require('colors');
const auth = require('../middleware/auth');
const User = require('../models/User');

exports.register = async (req,res,next) => {
        const errors = validationResult(req);
        let token = "";
    
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
    
            token = await jwt.sign(payload, process.env.jwtSecret, {expiresIn: 36000} );
            res.status(201).json({token})
        }
        catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    
}

exports.login =  async (req,res) => {

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
        token = await jwt.sign(payload, process.env.jwtSecret, {expiresIn: 36000} );
        res.status(201).json({token})
    }
    catch(err) {
        console.error(err);
        res.status(500).send('Logged in failed');
    }

}