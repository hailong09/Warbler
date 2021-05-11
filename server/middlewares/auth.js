const jwt = require('jsonwebtoken')

//make sure the user is logged - Authentication
exports.loginRequired = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if(decoded) {return next()}
            else{
                return next({
                    status: 401,
                    message: 'Please log in first'
                })
            }
        })
    } catch (error) {
        return next({
            status: 401,
            message: 'Please log in first'
        })
    }
}


//make sure the user is correct - Autorization
exports.isCorrectUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if(decoded && decoded.id === req.params.id){
                return next();
            } else{
                return next({
                    status: 401,
                    message: "Unauthorized!"
                })
            }
        })
    } catch (error) {
        return next({
            status: 401,
            message: "Unauthorized!"
        })
    }
}