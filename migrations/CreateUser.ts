import {
  DataTypes,
  Model,
  QueryInterface
} from 'sequelize'
import createId from '@/utilities/createId'
import createTimeStamps from '@/utilities/createTimeStamps'
import UserSqlRecord from '@/types/UserSqlRecord'
export const up: Function = async (queryInterface: QueryInterface): Promise<void> => await queryInterface.createTable<Model<UserSqlRecord>>(
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
export const down: Function = async (queryInterface: QueryInterface): Promise<void> => await queryInterface.dropTable('users')