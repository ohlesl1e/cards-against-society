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

router.post('/:gamesessionid', async (req, res) => {
  const results = [];
  models.gamesessions
    .findOne({ where: { gameid: req.params.gamesessionid } })
    .then(async (game) => {
      game.getHand().then(async (hands) => {
        const user = await models.user.findOne({
          where: {
            userid: req.body.userid
          }
        });
        hands.forEach((hand) => {
          if (user.hasHand(hand)) {
            console.log(hand);
            results[0] = [];
            hand.getCard().then(async (cards) => {
              cards.forEach((card) => {
                results[0].push(card.text);
              });
              models.blackCard
                .findOne({ where: { id: game.CurrentBlackCardId } })
                .then(async (blackCard) => {
                  results[1] = blackCard.text;
                  res.send(results);
                });
            });
          }
        });
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post('/join/:gamesessionid', async (req, res) => {
  models.gamesessions
    .findOne({ where: { gameid: req.params.gamesessionid } })
    .then(async (game) => {
      game.addPlayer(req.body.userid);
      game.save().then(() => {
        res.send(game);
      });

      const newHand = await models.hands.create();
      const user = await models.user.findOne({
        where: {
          userid: req.body.userid
        }
      });
      await user.addHand(newHand);
      await game.addHand(newHand);
      for (let i = 0; i < 5; i++) {
        models.whiteCard
          .findOne({ order: Sequelize.literal('rand()') })
          .then(async (whiteCard) => {
            newHand.addCard(whiteCard);
          });
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
  models.users.findOne({});
});

router.post('/newgame', (req, res) => {
  models.blackCard
    .findOne({ order: Sequelize.literal('rand()') })
    .then(async (blackCard) => {
      const host = req.body.userid;
      const game = await models.gamesessions.create({
        roomName: req.body.roomName
      });
      await game.setCurrentBlackCard(blackCard);
      await game.setHost(host);
      await game.addPlayer(req.body.userid);

      const newHand = await models.hands.create();
      const user = await models.user.findOne({
        where: {
          userid: req.body.userid
        }
      });
      await user.addHand(newHand);
      await game.addHand(newHand);
      for (let i = 0; i < 5; i++) {
        models.whiteCard
          .findOne({ order: Sequelize.literal('rand()') })
          .then(async (whiteCard) => {
            newHand.addCard(whiteCard);
          });
      }
      res.send(game);
    });
});

module.exports = router;
