var express = require('express');
const passport = require('passport');
var router = express.Router();
var User = require('./userModel');
const  { expressjwt: jwt } = require('express-jwt');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

router.get('/', auth, function (req, res) {
    User.find(function (err, found) {
        if (err || !found) return res.status(404).json(err);
        if (found) return res.status(200).json(found);
    })
});

router.post('/login', function (req, res) {
    if (!req.body.name || !req.body.password) return res.status(400).json({
        "message": "All fields required"
    });
    passport.authenticate('local', (err, user, info) => {
        let token;
        if (err) return res.status(404).json(err);
        if (user) {
            token = user.generateJwt();
            res.status(200).json({
                role: user.role,
                name: user.name,
                restau_id: user.restau_id,
                email: user.email,
                token
            });
        } else res.status(401).json(info);
    })(req, res);
});

router.post('/register', function (req, res) {
    if (!req.body.name || !req.body.password) return res.status(400).json({
        "message": "All fields required"
    });
    const user = new User();
    user.name = req.body.name;
    if(req.body.role) user.role = req.body.role;
    //TODO: if(req.body.restau_id) 
    user.restau_id = req.body.restau_id;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save((err, sUser) => {
        if (err) return res.status(404).json(err);
        const token = sUser.generateJwt();
        res.status(200).json({
            role: sUser.role,
            name: sUser.name,
            restau_id: sUser.restau_id,
            email: sUser.email,
            token
        });

    })
});

router.delete('/:user_id', function (req, res) {
    if (req.params.user_id) {
        User.findByIdAndRemove(req.params.user_id).exec((err, user) => {
            if (err) return res.status(404).json(err);
            res.status(204).json(null);
        })
    } else res.status(404).json({
        "message": "No user"
    });

});

module.exports = router;