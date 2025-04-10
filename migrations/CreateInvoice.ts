import {
  DataTypes,
  Model,
  QueryInterface
} from 'sequelize'
import createId from '@/utilities/createId'
import createTimeStamps from '@/utilities/createTimeStamps'
import InvoiceSqlRecord from '@/types/InvoiceSqlRecord'
export const up: Function = async (queryInterface: QueryInterface): Promise<void> => await queryInterface.createTable<Model<InvoiceSqlRecord>>(
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
export const down: Function = async (queryInterface: QueryInterface): Promise<void> => await queryInterface.dropTable('invoices')