const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const router = express.Router();
const models = require('../models');

const app = express();
const op = Sequelize.Op;

router.post('/newgame', (req, res) => {
  console.log(req.body.userid);
  models.blackCard
    .findOne({ order: Sequelize.literal('rand()') })
    .then(async (blackCard) => {
      const game = await models.gamesessions.create({
        roomName: req.body.roomName
      });
      await game.setCurrentBlackCard(blackCard);
      await game.setHost(req.body.userid);
      res.send(game);
    });
});

router.get('/allgames', async (req, res) => {
  const results = await models.gamesessions.findAll({
    raw: true
  });
  res.send(results);
});

module.exports = router;
