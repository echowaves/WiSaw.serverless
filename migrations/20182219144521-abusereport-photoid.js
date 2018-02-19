module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'AbuseReports',
      'photo_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    ),

  down: (queryInterface, Sequelize) => // eslint-disable-line no-unused-vars
    queryInterface.removeColumn('AbuseReports', 'photo_id'),
}
