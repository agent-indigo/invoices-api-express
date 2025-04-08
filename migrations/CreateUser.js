import {DataTypes} from 'sequelize'
import createId from '../utilities/createId.js'
import createTimeStamps from '../utilities/createTimeStamps.js'
export const up = async queryInterface => await queryInterface.createTable(
  'users', {
    ...createId(),
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: [
        true,
        'A user with this name already exists.'
      ],
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
      type: DataTypes.ENUM(
        'root',
        'user'
      ),
      allowNull: false,
      defaultValue: 'user'
    },
    ...createTimeStamps()
  }
)
export const down = async queryInterface => await queryInterface.dropTable('users')