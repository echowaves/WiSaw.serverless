import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../../../config/consts'

// import Photo from './photo'


export default class Recognition extends Model {}
Recognition.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  photoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  metaData: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
}, {
  sequelize,
})

// Recognition.belongsTo(Photo)
