/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const router = express.Router();
const models = require('../models');

router.post('/register', (req, res, next) => {
  models.user
    .findOne({
      where: {
        userid: req.body.userid
      }
    })
    .then((user) => {
      // if userId is already being used
      if (user) {
        return res.status(400).json({ result: 'User id is already used.' });
      }

      models.user.create({
        userid: req.body.userid,
        email: req.body.email,
        password: req.body.password,
        sessionToken: null
      });

      return res.status(200).json({ result: 'user created' });
    });
});

module.exports = router;
