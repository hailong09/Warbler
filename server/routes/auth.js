const express = require('express');
const router = express.Router();
const {signup, signin} = require('../handlers/auth')

//@route /api/auth
//@desc signup checking
//@access pulic
router.post('/signup', signup)

//@route /api/auth
//@desc signin checking
//@access pulic
router.post('/signin', signin)

module.exports = router