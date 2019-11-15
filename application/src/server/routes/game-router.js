const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const router = express.Router();
const models = require('../models');

const app = express();
const op = Sequelize.Op;

router.get('/allgames', async (req, res) => {
  const results = await models.gamesessions.findAll({
    raw: true
  });
  res.send(results);
});

router.get('/:gamesessionid', async (req, res) => {
  const results = [];
  models.gamesessions
    .findOne({ where: { gameid: req.params.gamesessionid } })
    .then(async (game) => {
      results[0] = game;
      console.log(game);
      models.blackCard
        .findOne({ where: { id: game.CurrentBlackCardId } })
        .then(async (card) => {
          results[1] = card.text;
          res.send(results);
        });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

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

module.exports = router;
