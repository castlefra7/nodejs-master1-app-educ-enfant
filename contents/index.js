var express = require('express');
const passport = require('passport');
var router = express.Router();
const Content = require('./contentModel');
const  { expressjwt: jwt } = require('express-jwt');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

router.get('/', auth, function(req, res) {
    Content.find(function (err, found) {
        if (err || !found) return res.status(404).json(err);
        if (found) return res.status(200).json(found);
    })
});

router.post('/', auth, function(req, res) {
    if(req.body.title && req.body.text) {
        const newCtnt = new Content(req.body);
        newCtnt.save().then(data => res.status(200).send(data)).catch(err => res.status(500).send(err));
    } else return res.status(404).json({"messages": "Title and Text fields are required"});
});

module.exports = router;