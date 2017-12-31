'use strict';

module.exports = {
up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('AbuseReports', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    uuid: {
      type: Sequelize.UUID,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }
)
.then(() => queryInterface.addIndex('AbuseReports', ['uuid']))
.then(() => queryInterface.addIndex('AbuseReports', ['createdAt']))

},

down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('AbuseReports');
}
};
