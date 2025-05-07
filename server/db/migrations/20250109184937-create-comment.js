'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Название таблицы, на которую ссылается
          key: 'id', // Поле, на которое ссылается
        },
        onUpdate: 'CASCADE', // Обновление при изменении связанной записи
        onDelete: 'CASCADE', // Удаление при удалении связанной записи
      },
      questId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Quests', // Название таблицы, на которую ссылается
          key: 'id', // Поле, на которое ссылается
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  },
};
