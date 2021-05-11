require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const errorHandler = require('./handlers/error')
const authRoutes = require('./routes/auth')
const messRoutes = require('./routes/message')
const {loginRequired, isCorrectUser} = require('./middlewares/auth')
const Message = require('./models/message')
//Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL,{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        console.log('mongoDB connected')
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}


//middlewares
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages',loginRequired, isCorrectUser, messRoutes)
app.get('/api/messages',loginRequired, async (req, res, next) => {
    try {
        let messages = await Message.find().sort({createdAt: 'desc'}).populate('user',{
            username: true,
            profileImageUrl: true
        })
        return res.json(messages);
    } catch (error) {
        return next(error)
    }
})


app.use((req, res,next) => {
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
})



app.use(errorHandler)

connectDB();
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})





