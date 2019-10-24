'use strict';

module.exports = (sequelize, Sequelize) => {
  const gamesession = sequelize.define(
    'gamesessions',
    {
      gameid: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
      },

      gameState: {
        type: Sequelize.TEXT('long'),
        allowNull: false
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

    gamesession.belongsTo(models.user, {
      as: 'Player',
      through: 'playerTable'
    });
  };

  return gamesession;
};
