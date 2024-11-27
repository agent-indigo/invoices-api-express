import {DataTypes} from 'sequelize'
import createId from '../utilities/createId.js'
export const up = async queryInterface => {
  await queryInterface.createTable(
    'users', {
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }
  )
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
export const down = async queryInterface => await queryInterface.dropTable('users')