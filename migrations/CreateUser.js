import {DataTypes} from 'sequelize'
import createId from '../utilities/createId.js'
export const up = async (
  queryInterface,
  Sequelize
) => {
  await queryInterface.createTable('users', {
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
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })
  await queryInterface.addConstraint(
    'users', {
      type: 'unique',
      fields: [
        'role'
      ],
      where : {
        role: 'root'
      },
      name: 'unique_root_constraint'
    }
  )
  await queryInterface.addConstraint(
    'users', {
      type: 'check',
      fields: [
        'role'
      ],
      where: {
        role: [
          'root',
          'user'
        ]
      },
      name: 'valid_role_constraint'
    }
  )
}
export const down = async (
  queryInterface,
  Sequelize
) => await queryInterface.dropTable('users')