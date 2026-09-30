import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import createId from '@/utilities/createId'
import sequelize from '@/config/sequelize'
import InvoiceSqlRecord from '@/types/InvoiceSqlRecord'
const invoiceModel: ModelStatic<Model<InvoiceSqlRecord>> = sequelize.models.Invoice ?? sequelize.define<Model<InvoiceSqlRecord>>(
  'Invoice', {
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
    }
  }, {
    tableName: 'invoices',
    timestamps: true
  }
)
export default invoiceModel