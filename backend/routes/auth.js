const express = require("express"),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    withAuth = require('../middleware/auth'),
    User = require('../models/User.js'),
    SECRET = 'thisismysecret@dsad12sd!@';


// POST route to register a user
router.post('/register', function (req, res) {
    const {username} = req.body;
    User.findOne({username}, function (err, user) {
        if (err) {
            res.status(500)
                .send({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            const user = new User(req.body);
            user.save(function (err) {
                if (err) {
                    res.status(500).send({
                        error: 'Internal error please try again'
                    });
                } else {
                    res.status(200).send({result: 'User Registered!'})
                }
            });
        } else {
            res.status(500).send({error:'User Already Registered.'});
        }

    })
});

router.post('/login', function (req, res) {
    const {username, password} = req.body;
    User.findOne({username}, function (err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect email or password'
                });
        } else {
            user.isCorrectPassword(password, function (err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    // Issue token
                    const payload = {username};
                    const token = jwt.sign(payload, SECRET, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, {httpOnly: true})
                        .status(200).json(user);
                }
            });
        }
    });
});

// router.get('/api/secret', withAuth, function(req, res) {
//     res.send('The password is potato');
// });

router.get('/checkToken', withAuth, function (req, res) {
    res.sendStatus(200);
});

module.exports = router;
