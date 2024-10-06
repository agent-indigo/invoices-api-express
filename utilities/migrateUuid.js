const migrateUuid = Sequelize => {
  return {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    }
  }
}
export default migrateUuid