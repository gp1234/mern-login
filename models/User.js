const moongose = require('mongoose');

const UserScema = new moongose.Schema({
    name:{
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = moongose.model('user', UserScema)