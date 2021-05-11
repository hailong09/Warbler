const Message = require('../models/message');
const User = require('../models/user')



exports.createMessage = async (req, res, next) => {

    try {
        const message = new Message({
            text: req.body.text,
            user: req.params.id
        })

        await message.save();

        let foundUser = await User.findById(req.params.id)
        foundUser.messages.push(message.id);
        await foundUser.save()
        
        let foundMessage = await Message.findById(message.id).populate('user',{
            username: true,
            profileImageUrl: true
        })
        
        return res.status(200).json(foundMessage);

    } catch (error) {
       
        return next(error)
    }

};

exports.getMessage = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.message_id);
        return res.json(message)
    } catch (error) {
        return next(error)
    }
};


exports.deleteMessage = async (req, res, next) => {
    try {
        const foundMessage = await Message.findById(req.params.message_id);
        await foundMessage.remove();
        return res.json(foundMessage)
    } catch (error) {
        return next(error)   
    }
};


