import {
  DataTypes
} from 'sequelize'
const createUuid = () => {
  return {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
  }
}
export default createUuid