'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Quest, { foreignKey: 'authorId' });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: {
        // Добавляем поле для аватара
        type: DataTypes.STRING,
        allowNull: true, // Можно оставить пустым, если аватар не обязательный
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
