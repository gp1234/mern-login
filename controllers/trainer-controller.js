const User = require('../models/User');

exports.profile =  async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch(err) {
        console.error(err.message.red);
        res.status(500).send('Server error');
    }
}

