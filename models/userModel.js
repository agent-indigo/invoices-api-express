import {Model, DataTypes} from 'sequelize'
import createPk from '../utilities/createPk.js'
import sequelize from '../utilities/sequelize.js'
class userModel extends Model {}
userModel.init({
  ...createPk(),
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {notContains: {
      args: [' '],
      msg: 'Spaces prohibited.'
    }}
  },
  shadow: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('root','user'),
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
        if (await userModel.findOne({where: {
          role: 'root'
        }})) {
          throw new Error(
            'There can be only one root user.'
          )
        }
      }
    }
  }
})
export default userModel