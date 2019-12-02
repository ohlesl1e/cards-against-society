JsonField = require('sequelize-json');

module.exports = (sequelize, Sequelize) => {
  const hand = sequelize.define(
    'hands',
    {
      handID: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
      }
    },

    {
      updatedAt: false
    }
  );
  hand.associate = (models) => {
    hand.belongsToMany(models.whiteCard, {
      as: 'Card',
      through: 'handTable'
    });

    hand.belongsToMany(models.gamesessions, {
      as: 'Game',
      through: 'gameHands',
      foreignKey: 'handID'
    });
  };
  return hand;
};
