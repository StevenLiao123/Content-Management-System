const Role = require("../models/role");

exports.roles_get_all = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json({
      data: {
        status: "1",
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

exports.roles_add_new_one = (req, res, next) => {
  Role.find({ name: req.body.name })
    .then(role => {
      if (role.length >= 1) {
        return res.status(409).json({
          data: {
            message: "This role has already been added!"
          }
        });
      } else {
        const role = new Role({
          name: req.body.name,
          menu: req.body.menu,
          create_time: Date.now(),
          auth_time: req.body.auth_time,
          auth_name: req.body.auth_name
        });

        role
          .save()
          .then(result => {
            res.status(201).json({
              data: {
                status: "1",
                result,
                message: "Role added!"
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
};

exports.roles_update_exist_one = (req, res, next) => {
  Role.find({ _id: req.body._id }, async () => {
    try {
      const updateRole = await Role.updateMany(
        { _id: req.body._id },
        {
          $set: {
            menu: req.body.menu,
            auth_time: Date.now(),
            auth_name: req.body.auth_name
          }
        }
      );
      res.json({
        data: {
          status: "1",
          updateRole
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
