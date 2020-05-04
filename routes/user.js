const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET BACK ALL THE USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    const roles = await Role.find();
    res.json({
      data: {
        users,
        roles
      }
    });
  } catch (err) {
    res.json({
      data: {
        message: err
      }
    });
  }
});

// Create a new user
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    User.find({ username: req.body.username }).then(async user => {
      if (user.length >= 1) {
        return res.status(409).json({
          data: {
            message: "Username has been signed up already!"
          }
        });
      } else {
        if (err) {
          return res.status(500).json({
            data: {
              error: err
            }
          });
        } else {
          const user = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            phone: req.body.phone,
            role:  await Role.findById("5e8fd7775583a73fd954f8ed"),
            role_id: "5e8fd7775583a73fd954f8ed",
            create_time: Date.now()
          });
          console.log(Role.findById("5e8fd7775583a73fd954f8ed"));

          user
            .save()
            .then(result => {
              res.status(201).json({
                data: {
                  message: "User created!"
                }
              });
            })
            .catch(err => {
              res.status(500).json({
                data: {
                  message: err
                }
              });
            });
        }
      }
    });
  });
});

// login
router.post("/login", (req, res, next) => {
  User.find({ username: req.body.username })
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          data: {
            message: "Sorry, the account is not exist."
          }
        });
      }
      bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
        if (err) {
          return res.status(401).json({
            data: {
              message: "User name or password incorrect!"
            }
          });
        } else if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );

          const updateUser = await User.updateMany(
            { username: req.body.username },
            {
              $set: {
                role: await Role.find({ _id: user[0].role_id }),
              }
            }
          );

          return res.status(200).json({
            data: {
              message: "Authentication successful!",
              user: await User.find({ username: req.body.username }),
              updateUser,
              token: token
            }
          });
        }
        res.status(401).json({
          data: {
            message: "Sorry, user name or password incorrect!"
          }
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        data: {
          message: "The server error!" + err
        }
      });
    });
});

// Add a new role
router.post("/add", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    User.find({ username: req.body.username })
      .then(async user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "This user has already been created!"
          });
        } else {
          const user = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            phone: req.body.phone,
            role:  await Role.find({ _id: req.body.role_id }),
            role_id: req.body.role_id,
            create_time: Date.now()
          });

          user
            .save()
            .then(async user => {
              res.status(201).json({
                data: {
                  user,
                  message: "User added!"
                }
              });
            })
            .catch(err => {
              res.status(500).json({
                data: {
                  message: err
                }
              });
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
});

//SPECIFIC USER
router.get("/:postId", async (req, res) => {
  try {
    const user = await User.findById(req.params.postId);
    res.json(user);
  } catch (err) {
    res.json({
      data: {
        message: err
      }
    });
  }
});

//DELETE USER
router.post("/delete", async (req, res) => {
  try {
    const removeUser = await User.deleteOne({ _id: req.body._id });
    res.json({
      message: "User deleted!",
      removeUser
    });
  } catch (err) {
    res.json({
      data: {
        message: err
      }
    });
  }
});

// update an user
router.post("/update", (req, res, next) => {
  Role.find({ _id: req.body._id }, async () => {
    try {
      const updateUser = await User.updateMany(
        { _id: req.body._id },
        {
          $set: {
            username: req.body.username,
            phone: req.body.phone,
            email: req.body.email,
            role: await Role.find({ _id: req.body.role_id }),
            role_id: req.body.role_id
          }
        }
      );
      res.json({
        data: {
          message: "Update user sccuessful!",
          updateUser
        }
      });
    } catch (err) {
      res.json({
        data: {
          message: err
        }
      });
    }
  });
});

module.exports = router;
