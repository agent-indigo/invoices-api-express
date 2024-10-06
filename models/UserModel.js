import {
  Model,
  DataTypes
} from 'sequelize'
import createUuid from '../utilities/createUuid.js'
import sequelize from '../utilities/sequelize.js'
class UserModel extends Model {}
UserModel.init({
  ...createUuid(),
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
  sequelize,
  modelName: 'user',
  tableName: 'users',
  timestamps: true,
  hooks: {
    async beforeCreate(user) {
      if (user.role === 'root') {
        if (await UserModel.findOne({
          where: {
            role: 'root'
          }
        })) {
          throw new Error(
            'There can be only one root user.'
          )
        }
      }
    }
  }
})
export default UserModel