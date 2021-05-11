const User = require('../models/user');
const jwt = require('jsonwebtoken');
exports.signin = async (req, res, next) => {
    //finding user
    //checking if their password matches waht was sent to the server
    try {
        
        const foundUser = await User.findOne({
            email: req.body.email
        })
        
        const {id, username, profileImageUrl} = foundUser
        const isMatch = await foundUser.comparePassword(req.body.password)
       
        if(isMatch){
            let token = jwt.sign({
                id,
                username,
                profileImageUrl,
            }, process.env.SECRET_KEY)
            
            return res.json({
                id,
                username,
                profileImageUrl,
                token
            })
        } else {
           
            return next({
                status: 400,
                message: "Invalid Email/Password."
            })
        }

       
    } catch (error) {
        
        return next({
            status: 400,
            message: "Invalid Email/Password."
        })
    }
};


exports.signup = async (req , res, next) => {
    try {
        //create user
        const newUser = new User(req.body);
        await newUser.save();
        const  {id, username, profileImageUrl} = newUser;
        const token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY)

        return res.json({
            id,
            username,
            profileImageUrl,
            token
        })

        //create atoke
    } catch (error) {
        //check if validation fails
        if(error.code === 11000){
            error.message = 'Username and/or email is taken!'
        }
        return next({
            status: 400,
            message: error.message 
        })
        //check for error
        //if contain error 
        //response usename/passord already taken if not return a 400 bad req error
    }
}