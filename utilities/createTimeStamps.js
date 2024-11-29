import {DataTypes} from 'sequelize'
const createTimeStamps = () => {
  return {
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }
}
export default createTimeStamps