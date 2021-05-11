const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    messages: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }

    ],
    profileImageUrl: String
})

userSchema.pre('save', async function(next) {
    try {
        if(!this.isModified('password')){
                return next();
        }

        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
})

userSchema.methods.comparePassword = async function(candiatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candiatePassword, this.password);
        return isMatch;
    } catch (error) {
        return next(error);
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User