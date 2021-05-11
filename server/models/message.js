const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');


const messageSchema = new Schema({
    text:{
        type: String,
        required: true,
        maxLength:160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


messageSchema.pre('remove', async function(next){
    //find user
    //remove the id of message from message list
    try {
        await User.findByIdAndUpdate(this.user, {$pull: {messages: this.id}}, {new: true})
        return next();

    } catch (error) {
        return next(error);
    }
})


const Message = mongoose.model('Message', messageSchema)

module.exports = Message