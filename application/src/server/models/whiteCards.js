const fs = require('fs');

module.exports = (sequelize, Sequelize) => {
  const whiteCard = sequelize.define(
    'whiteCard',
    {
      id: {
        type: Sequelize.INTEGER(9),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      text: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      }
    },
    {
      updatedAt: false
    }
  );
  whiteCard.associate = (models) => {
    whiteCard.belongsToMany(models.hands, {
      as: 'Hand',
      through: 'handTable'
    });
  };

  fs.readFile(`${__dirname}/../whitecardsfixed.json`, (err, data) => {
    whiteCard.bulkCreate(JSON.parse(data.toString())).then((result) => {
      console.log('white cards added into database');
    });
  });

  return whiteCard;
};
