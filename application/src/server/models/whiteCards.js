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
  return whiteCard;
};
