'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // Связь с моделью User
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      // Связь с моделью Quest
      Comment.belongsTo(models.Quest, { foreignKey: 'questId' });
    }
  }
  Comment.init(
    {
      text: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      questId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
