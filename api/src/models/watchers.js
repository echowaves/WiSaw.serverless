import Sequelize from 'sequelize'
import { sequelize } from '../../../config/consts'

const Watchers = sequelize.define('Watchers', {
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

export default Watchers
