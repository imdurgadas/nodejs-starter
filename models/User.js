const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please set a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date
}, { timestamps: true })


//Encrypt the password using bcrypt
UserSchema.pre('save', async function (next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next();
});

//Sign jwt and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, name: this.name, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

module.exports = mongoose.model('User', UserSchema);