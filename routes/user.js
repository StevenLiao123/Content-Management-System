const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// GET BACK ALL THE USERS
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

/*
router.get('/specific', (req, res) => {
    res.send("The specific message!");
});
*/

// Create a new user
router.post('/register', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        User.find({ username: req.body.username}).then(user => {
            if(user.length >= 1) {
                return res.status(409).json({
                    message: 'Username has been signed up already!'
                });
            } else {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        username: req.body.username,
                        password: hash,
                        email: req.body.email
                    });
        
                    user.save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: 'User created!'
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: err
                            });
                        });
                }
            }
        });
    });
});

// login 
router.post('/login', (req, res, next) => {
    User.find({ username: req.body.username })
        .then(user => {
            if( user.length < 1 ) {
                return res.status(401).json({
                    message: 'Authentication failed!'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: 'User name or password incorrect!'
                    });
                } if(result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        userId: user[0]._id
                    }, 
                        process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });

                    return res.status(200).json({
                        message: 'Authentication successful!',
                        data: user,
                        token: token
                    });
                } 
                res.status(401).json({
                    message: 'User name or password incorrect!'
                });
            });
        })
    .catch(err => {
            res.status(500).json({
                message: 'The server error!' + err
            });
        });
});

//SPECIFIC USER
router.get('/:postId', async (req, res) => {
    try {
        const user = await User.findById(req.params.postId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE USER
router.delete('/:username', async (req, res) => {
    try {
        const removeUser = await User.remove({ username: req.params.username });
        res.json({
            message: 'User deleted!'
        });
    } catch (err) {
        res.json({ message: err });
    }

});

//UPDATE A POST
router.patch('/:username', async (req, res) => {
    try {
        const updateUser = await User.updateOne(
            { username: req.params.username },
            { $set: { email: req.body.email } }
        );
        res.json(updateUser);

    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;