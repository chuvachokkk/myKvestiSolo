// models/Quest.js
module.exports = (sequelize, DataTypes) => {
  const Quest = sequelize.define('Quest', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    teamSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ageLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true, // Поле не обязательно
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Поле не обязательно
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Quest.associate = (models) => {
    Quest.belongsTo(models.User, { foreignKey: 'authorId' });
  };

  return Quest;
};
