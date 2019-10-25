import Sequelize from 'sequelize'
import { sequelize } from '../../../config/consts'

const Watcher = sequelize.define('Watcher', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  photoId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
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

// Adding a class level method

// Adding an instance level method

export default Watcher
