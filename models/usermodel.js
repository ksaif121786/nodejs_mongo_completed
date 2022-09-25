const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    image: {
        type: String,
        default: '/uploads/user/default.png'
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        
    },
    password: {
        type: String
    },
    status: {
        type: String,
        default: 'active'
    },
    is_deleted: {
        type: String,
        default: 0
    }
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);
