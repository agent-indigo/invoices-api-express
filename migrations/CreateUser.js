import {DataTypes} from 'sequelize'
import createId from '../utilities/createId.js'
import createTimeStamps from '../utilities/createTimeStamps.js'
export const up = async queryInterface => await queryInterface.createTable(
  'users', {
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
    roles: {
      type: DataTypes.ARRAY(DataTypes.ENUM(
        'root',
        'user'
      )),
      allowNull: false,
      defaultValue: ['user']
    },
    authorities: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    account_non_expired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    account_non_locked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    credentials_non_expired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    ...createTimeStamps()
  }
)
export const down = async queryInterface => await queryInterface.dropTable('users')