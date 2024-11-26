import {DataTypes} from 'sequelize'
import createId from '../utilities/createId.js'
import sequelize from '../utilities/sequelize.js'
const invoiceModel = sequelize.models.Invoice ?? sequelize.define(
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
    timestamps: true
  }
)
export default invoiceModel