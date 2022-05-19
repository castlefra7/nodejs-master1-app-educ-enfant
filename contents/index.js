var express = require('express');
const passport = require('passport');
var router = express.Router();
const Content = require('contentModel');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

router.get('/', auth, function(req, res) {
    res.status(200).json({"message": "done"})
});

module.exports = router;