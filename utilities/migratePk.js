const migratePk = Sequelize => {
  return {
    pk: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    }
  }
}
export default migratePk