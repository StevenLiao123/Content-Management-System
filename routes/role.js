const express = require('express');
const router = express.Router();
const Role = require('../models/role');

// get back all roles
router.get('/', async (req, res) => {
    try {
        const allRoles = await Role.find();
        res.json({
            data: allRoles
        });
    } catch (err) {
        res.json({ message: err });
    }
});

// get a list of roles based on the parentId
// router.post('/list', async (req, res) => {
//     try {
//         const categoriesByParentId = await Category.find({ parentId: req.body.parentId });
//         res.json(categoriesByParentId);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });


// Create a new role
router.post('/add', (req, res, next) => {
    Role.find({ name: req.body.name }).then(role => {
        if (role.length >= 1) {
            return res.status(409).json({
                message: 'This role has already been added!'
            });
        } else {
            const role = new Role({
                name: req.body.name,
                menu: req.body.menu,
                create_time: Date.now(),
                auth_time: req.body.auth_time,
                auth_name: req.body.auth_name
            });

            role.save()
                .then(result => {
                    res.status(201).json({
                        data: result,
                        message: 'Role added!'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: err
                    });
                });
        }
    }
    ).catch(err => {
        console.log(err);
    });
});

// delete a category
// router.delete('/:name', async (req, res) => {
//     try {
//         const removeCategory = await Category.deleteOne({ name: req.params.name });
//         res.json({
//             message: 'Category deleted!',
//             removeCategory
//         });
//     } catch (err) {
//         res.json({ message: err });
//     }

// });

// update a category
router.post("/update", (req, res, next) => {
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
        res.json({ message: "Update role sccuessful!", updateRole });
      } catch (err) {
        res.json({ message: err });
      }
    });
  });


module.exports = router;