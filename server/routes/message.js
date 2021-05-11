const express = require('express');
const router = express.Router({mergeParams:true})
const {createMessage, getMessage, deleteMessage} = require('../handlers/messages')



//@route /api/users/:id/messages
//@desc create message
//@access private
router.route('/').post(createMessage)

//@route /api/users/:id/messages/:message_id
router.route('/:message_id')
//@desc get message
//@access private
    .get(getMessage)
//@desc delete message
//@access private
    .delete(deleteMessage)

module.exports = router;