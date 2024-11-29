import {DataTypes} from 'sequelize'
import createId from '../utilities/createId.js'
import createTimeStamps from '../utilities/createTimeStamps.js'
export const up = async queryInterface => await queryInterface.createTable(
  'invoices', {
    ...createId(),
    vendor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL(
        7,
        2
      ),
      allowNull: false,
      defaultValue: 0.0
    },
    hst: {
      type: DataTypes.DECIMAL(
        6,
        2
      ),
      allowNull: false,
      defaultValue: 0.0
    },
    total: {
      type: DataTypes.DECIMAL(
        7,
        2
      ),
      allowNull: false,
      defaultValue: 0.0
    },
    invoiceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    ...createTimeStamps()
  }
)
export const down = async queryInterface => await queryInterface.dropTable('invoices')