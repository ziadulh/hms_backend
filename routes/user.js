const express = require('express')
const User = require('../models/User')
const router = express.Router();


router.get('/', function (req, res, next) {
    User.findAll({
        attributes: ['id', 'name', 'email']
    }).then((users) => {
        return res.status(200).json(users[0].dataValues);
    });
});

module.exports = router;