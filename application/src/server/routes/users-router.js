/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = express.Router();
const models = require('../models');

router.put('/userSearch', async function(req,res){
  if(req.body.userid !== null){
    models.user.findAll({
      raw: true,
      where:{
      
        userid: {
          [Op.like]: '%' + req.body.userid + '%'
        }
      }
    }).then(users => {
      console.log(users);
      res.send(users);
    }).catch(error =>{
      res.status(500).send(error);
    })
  }
  else{
    models.user.findAll({
      raw: true
    }).then(users => {
      console.log(users)
      res.send(JSON.stringify(users));
    }).catch(error =>{
      res.status(500).send(error);   
    })
  }
});

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
