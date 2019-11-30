JsonField = require('sequelize-json');

module.exports = (sequelize, Sequelize) => {
  const gamesession = sequelize.define(
    'gamesessions',
    {
      gameid: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
      },
      roomName: {
        type: Sequelize.STRING(20)
      }
    },

    {
      updatedAt: false
    }
  );

  gamesession.associate = (models) => {
    gamesession.belongsTo(models.user, {
      as: 'Host',
      through: 'hostTable'
    });

    gamesession.belongsToMany(models.user, {
      as: 'Player',
      through: 'playerTable'
    });

    gamesession.belongsTo(models.blackCard, {
      as: 'CurrentBlackCard',
      through: 'cardTable'
    });

    gamesession.belongsToMany(models.hands, {
      as: 'Hand',
      through: 'gameHands'
    });
  };

  return gamesession;
};
