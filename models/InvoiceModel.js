import {Model, DataTypes} from 'sequelize'
import createPk from '../utilities/createPk.js'
import sequelize from '../utilities/sequelize.js'
class InvoiceModel extends Model {}
InvoiceModel.init({
  ...createPk(),
  vendor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(7, 2),
    allowNull: false,
    defaultValue: 0.0
  },
  hst: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: false,
    defaultValue: 0.0
  },
  total: {
    type: DataTypes.DECIMAL(7, 2),
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
  }
}, {
  sequelize,
  modelName: 'invoice',
  tableName: 'invoices',
  timestamps: true
})
export default InvoiceModel