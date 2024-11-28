import {DataTypes} from 'sequelize'
import createId from '../utilities/createId.js'
import sequelize from '../utilities/sequelize.js'
const userSqlModel = sequelize.models.User ?? sequelize.define(
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
      defaultValue: 'user'
    }
  }, {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async user => {
        if (user.get('role') === 'root') if (await userSqlModel.findOne({
          where: {
            role: 'root'
          }
        })) throw new Error('The root user already exists.')
      },
      beforeDestroy: async user => {
        if (user.get('role') === 'root') throw new Error('The root user shouldn\'t be deleted.')
      }
    }
  }
)
export default  userSqlModel