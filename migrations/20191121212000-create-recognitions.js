module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Recognitions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      photoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      metaData: {
        type: Sequelize.JSONB,
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
      .then(() => queryInterface.addIndex('Recognitions', ['photoId']))
      .then(() => queryInterface.addIndex('Recognitions', ['metaData'])),
  down: (queryInterface, Sequelize) => // eslint-disable-line no-unused-vars
    queryInterface.dropTable('Recognitions'),
}
