module.exports = (sequelize, Sequelize) => {
  const card = sequelize.define(
    'card',
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
      },
      draw: {
        type: Sequelize.INTEGER(6),
        allowNull: false,
        default: 0
      },
      pick: {
        type: Sequelize.INTEGER(6),
        allowNull: false,
        default: 1
      }
    },
    {
      updatedAt: false
    }
  );
  return card;
};
