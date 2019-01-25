import Sequelize from 'sequelize'
import { sequelize } from '../../../config/consts'

const Comment = sequelize.define('Comment', {
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
  comment: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  deactivatedBy: {
    type: Sequelize.UUID,
    allowNull: true,
    defaultValue: null,
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

export default Comment
