import {DataTypes} from 'sequelize'
import createId from '../utilities/createId.js'
import sequelize from '../utilities/sequelize.js'
const userModel = sequelize.models.User ?? sequelize.define(
  'User', {
    ...createId(),
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notContains: {
          args: [
            ' '
          ],
          msg: 'Spaces prohibited.'
        }
      }
    },
    shadow: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM(
        'root',
        'user'
      ),
      allowNull: false,
      defaultValue: 'user',
      unique: 'root'
    }
  }, {
    tableName: 'users',
    timestamps: true
  }
)
export default  userModel