const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    hash: String,
    salt: String,
    role: {type: Number, default: 1}, // 0: E-kaly, 1: customer, 2: restaurant, 3: delivery guy
    restau_id: {type: Schema.Types.ObjectId, ref: 'Restaurant'}
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

userSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({_id: this._id, name: this.name, role: this.role, email: this.email, restau_id: this.restau_id, exp: parseInt(expiry.getTime() / 1000, 10)}, process.env.JWT_SECRET)
}

const User = mongoose.model('User', userSchema);

module.exports = User;