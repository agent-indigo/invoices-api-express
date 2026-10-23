import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import createId from '@/utilities/createId'
import sequelize from '@/connectors/sequelize'
import User from '@/types/User'
import connectToSqlDb from '@/utilities/connectToSqlDb'
const userSqlModel: ModelStatic<Model<User>> = sequelize.models.User ?? sequelize.define<Model<User>>(
  'User', {
    ...createId(),
    username: {
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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user: Model<User>): Promise<void> => {
        await connectToSqlDb()
        if (await userSqlModel.count({
          where: {
            role: 'admin'
          }
        }) > 0) {
          throw new Error('The admin user already exists.')
        } else {
          user.setDataValue(
            'role',
            'admin'
          )
        }
      },
      beforeDestroy: (user: Model<User>): void => {
        if (user.getDataValue('role') === 'root') throw new Error('The root user shouldn\'t be deleted.')
      }
    }
  }
)
export default  userSqlModel