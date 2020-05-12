const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.users_get_all = async (req, res) => {
  try {
    const users = await User.find();
    const roles = await Role.find();
    res.json({
      data: {
        status: "1",
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
};

exports.users_add_new_one = (req, res, next) => {
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
            role: await Role.find({ _id: req.body.role_id }),
            role_id: req.body.role_id,
            create_time: Date.now()
          });

          user
            .save()
            .then(async user => {
              res.status(201).json({
                data: {
                  status: "1",
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
};

exports.users_find_specific_one = async (req, res) => {
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
};

exports.users_delete_exist_one = async (req, res) => {
  try {
    const removeUser = await User.deleteOne({ _id: req.body._id });
    res.json({
      data: {
        status: "1",
        message: "User deleted!",
        removeUser
      }
    });
  } catch (err) {
    res.json({
      data: {
        message: err
      }
    });
  }
};

exports.users_update_exist_one = (req, res, next) => {
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
          status: "1",
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
};

exports.users_sign_up = (req, res, next) => {
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
            role: await Role.findById("5e8fd7775583a73fd954f8ed"),
            role_id: "5e8fd7775583a73fd954f8ed",
            create_time: Date.now()
          });

          user
            .save()
            .then(result => {
              res.status(201).json({
                data: {
                  message: "User created!",
                  user
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
};

exports.users_login_in = (req, res, next) => {
  User.find({ username: req.body.username })
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          data: {
            message: "Sorry, the account is not exist."
          }
        });
      }
      bcrypt.compare(
        req.body.password,
        user[0].password,
        async (err, result) => {
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
                  role: await Role.find({ _id: user[0].role_id })
                }
              }
            );

            return res.status(200).json({
              data: {
                status: "1",
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
        }
      );
    })
    .catch(err => {
      res.status(500).json({
        data: {
          message: "The server error!" + err
        }
      });
    });
};
