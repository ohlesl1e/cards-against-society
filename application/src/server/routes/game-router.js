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

router.post('/newgame', (req, res) => {
  console.log('HEY\n\n');
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
      await game.setBCH(user);
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

router.post('/:gamesessionid', async (req, res) => {
  const results = [];
  models.gamesessions
    .findOne({ where: { gameid: req.params.gamesessionid } })
    .then(async (game) => {
      game.getPlayer().then(async (players) => {
        const playerNames = [];
        players.forEach((player) => {
          playerNames.push(player.userid);
        });
        results[2] = playerNames;
        game.getBCH().then(async (bch) => {
          results[3] = bch.userid;
        });
        game.getHand().then(async (hands) => {
          const user = await models.user.findOne({
            where: {
              userid: req.body.userid
            }
          });
          hands.forEach((hand) => {
            user.getHand().then(async (playerHands) => {
              playerHands.forEach((playerHand) => {
                if (playerHand.handID === hand.handID) {
                  results[0] = [];
                  hand.getCard().then(async (cards) => {
                    cards.forEach((card) => {
                      const cardArr = [];
                      cardArr.push(card.text);
                      cardArr.push(card.id);
                      results[0].push(cardArr);
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
          });
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
    })
    .catch((error) => {
      res.status(400).send(error);
    });
  models.users.findOne({});
});

module.exports = router;
