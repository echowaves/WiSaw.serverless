module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Watchers', {
      photoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
      .then(() => queryInterface.addIndex('Watchers', ['photoId']))
      .then(() => queryInterface.addIndex('Watchers', ['uuid'])),

  down: (queryInterface, Sequelize) => // eslint-disable-line no-unused-vars
    queryInterface.dropTable('Watchers'),
}
