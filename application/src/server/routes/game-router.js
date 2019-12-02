const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const router = express.Router();
const models = require('../models');

const app = express();
const op = Sequelize.Op;

function sendJoin() {}

router.get('/allgames', async (req, res) => {
  const results = await models.gamesessions.findAll({
    raw: true
  });
  res.send(results);
});

router.post('/newgame', async (req, res) => {
  const blackCard = await models.blackCard.findOne({
    // retrieving random black card
    order: Sequelize.literal('rand()')
  });

  const host = req.body.userid;
  const game = await models.gamesessions.create({
    // initializing new gamesession and values
    roomName: req.body.roomName,
    pick: blackCard.pick,
    playersPicked: 0,
    playerCount: 1,
    capacity: req.body.size,
    gameState: {
      state: [],
      points: [{ [host]: 0 }]
    }
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
    // creating new hand
    models.whiteCard
      .findOne({ order: Sequelize.literal('rand()') })
      .then(async (whiteCard) => {
        newHand.addCard(whiteCard);
      });
  }
  const io = req.app.get('socketio');
  io.of('/lobby').emit('roomUpdate');
  res.send(game);
});

router.post('/:gamesessionid', async (req, res) => {
  const room = '/games/' + req.params.gamesessionid;

  const io = req.app.get('socketio');
  io.of(room).on('connection', async (client) => {
    client.removeAllListeners();
    client.on('subscribeToChat', async (msg) => {
      io.of(room).emit('message', msg);
    });

    client.on('subscribeToState', async () => {
      io.of(room).emit('state');
    });
  });

  const results = [];
  const game = await models.gamesessions.findOne({
    // retrieve gamesession
    where: { gameid: req.params.gamesessionid }
  });

  const user = await models.user.findOne({
    // retrieve user
    where: {
      userid: req.body.userid
    }
  });

  await game.getBCH().then(async (bch) => {
    if (bch.userid === user.userid) {
      console.log('bch request');
      if (game.playersPicked === game.playerCount - 1) {
        console.log('ready for selection');
        results[7] = game.gameState.state;
      }
    }
  });

  await game.getPlayer().then(async (players) => {
    // retrieving userids in game
    const playerNames = [];
    if (game.playersPicked === game.playerCount - 1) {
      results[5] = true;
    } else {
      results[5] = false;
    }
    results[6] = false;
    game.gameState.state.forEach(async (state) => {
      if (state.userid === req.body.userid) {
        results[6] = true;
      }
    });

    results[4] = game.pick;
    players.forEach((player) => {
      playerNames.push(player.userid);
    });
    results[2] = playerNames;
  });
  await game.getBCH().then(async (bch) => {
    // retrieving current BCH of game
    results[3] = bch.userid;
  });
  await game // the hand of the player is retrieved
    .getHand()
    .then(async (hands) => {
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
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post('/update/:gamesessionid', async (req, res) => {
  const io = req.app.get('socketio');
  const room = '/games/' + req.params.gamesessionid;
  const user = await models.user.findOne({
    where: {
      userid: req.body.userid
    }
  });
  await models.gamesessions
    .findOne({ where: { gameid: req.params.gamesessionid } })
    .then(async (game) => {
      const newState = game.gameState;

      let submitted = false;
      await newState.state.forEach(async (state) => {
        if (state[0] === req.body[0]) {
          console.log('user already submitted');
          submitted = true;
        }
      });
      if (!submitted) {
        await newState.state.push(req.body);
        game.playersPicked += 1;
        await game.save();
        await game.update({ gameState: newState });
        await game // the hand of the player is retrieved
          .getHand()
          .then(async (hands) => {
            hands.forEach((hand) => {
              user.getHand().then(async (playerHands) => {
                playerHands.forEach((playerHand) => {
                  if (playerHand.handID === hand.handID) {
                    hand.getCard().then(async (cards) => {
                      cards.forEach((card) => {
                        if (req.body.cards.includes(card.text)) {
                          console.log(card.text);
                          models.whiteCard
                            .findOne({ order: Sequelize.literal('rand()') })
                            .then(async (whiteCard) => {
                              await hand.removeCard(card);
                              await hand.addCard(whiteCard);
                              await hand.save();
                              await io.of(room).emit('state');
                            });
                        }
                      });
                    });
                  }
                });
              });
            });
          });
      }
    });
});

router.post('/join/:gamesessionid', async (req, res) => {
  const io = req.app.get('socketio');
  const room = '/games/' + req.params.gamesessionid;

  let found = false; // to check if user is already in the game
  const game = await models.gamesessions.findOne({
    where: { gameid: req.params.gamesessionid }
  });
  const user = await models.user.findOne({
    where: {
      userid: req.body.userid
    }
  });
  await game.getPlayer().then(async (players) => {
    players.forEach((player) => {
      if (player.userid === req.body.userid) {
        res.send(game);
        found = true;
      }
    });
  });
  if (!found || game.capacity !== game.playerCount) {
    const io = req.app.get('socketio');
    const room = '/games/' + req.params.gamesessionid;
    const msg = {
      msg: `${req.body.userid} has joined the game!`,
      title: 'Bot'
    };
    const newState = game.gameState;
    const name = user.userid;
    const newpoints = { [name]: 0 };
    await newState.points.push(newpoints);
    await game.addPlayer(req.body.userid);
    await game.update({ gameState: newState });
    game.playerCount += 1;
    await game.save();
    const newHand = await models.hands.create();

    await user.addHand(newHand);
    await game.addHand(newHand);
    for (let i = 0; i < 5; i++) {
      models.whiteCard
        .findOne({ order: Sequelize.literal('rand()') })
        .then(async (whiteCard) => {
          newHand.addCard(whiteCard);
        });
    }
    await io.of(room).emit('message', msg);
    await io.of(room).emit('state');
    await io.of('/lobby').emit('roomUpdate');
    await res.send(game);
  }
});

module.exports = router;
