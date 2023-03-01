const express = require('express')
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs');


router.get('/', function (req, res, next) {
    User.findAll({
        attributes: ['id', 'name', 'email']
    }).then((users) => {
        return res.status(200).json(users[0].dataValues);
    });
});

router.post('/create', async function (req, res) {
    try {
        let salt = await bcrypt.genSaltSync(10);
        var pass = bcrypt.hashSync(req.body.password, salt);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: pass,
            role: req.body.role,
            createdBy: req.body.createdBy
        });
        return res.status(200).json(user);
    } catch (error) {

    }

});

module.exports = router;