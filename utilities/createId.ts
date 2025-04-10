import {DataTypes} from 'sequelize'
const createId: Function = (): Object => {
  return {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
  }
}
export default createId