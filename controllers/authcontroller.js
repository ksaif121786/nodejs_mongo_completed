const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// models
const Usermodel = require('../models/usermodel');


exports.register = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        var hash = bcrypt.hashSync(password, 10);

        var userdata = new Usermodel();
        userdata.firstname = firstname;
        userdata.lastname = lastname;
        userdata.email = email;
        userdata.password = hash;
        await userdata.save();

        var token = jwt.sign({ userId: userdata._id }, 'bigmall', { expiresIn: 60 * 60 });
        return res.json({ status: true, data: { token }, message: 'Register successfully.' });
    } catch (err) {
        console.log(err);
        return res.json({ status: false, message: err });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        var getuser = await Usermodel.findOne({ email, is_deleted: 0 });
        if (!getuser) return res.json({ status: false, message: 'Account not found related to this email.' });

        var hash = bcrypt.compareSync(password, getuser.password);
        if (!hash) return res.json({ status: false, message: 'Please check your password.' });

        var token = jwt.sign({ userId: getuser._id }, 'bigmall', { expiresIn: 60 * 60 });
        return res.json({ status: true, data: { token }, message: 'login successfully.' });
    } catch (err) {
        console.log(err);
        return res.json({ status: false, message: err });
    }
}


exports.userprofile = async (req, res) => {
    try {
        var user = await Usermodel.findById(req.user.userId);
        return res.json({ status: true, data: { user }, message: 'user profile.' });
    } catch (err) {
        console.log(err);
        return res.json({ status: false, message: err });
    }
}