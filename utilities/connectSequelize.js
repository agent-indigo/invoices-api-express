import sequelize from './sequelize.js'
const connectSequelize = async () => {
  let connected = false
  if (!connected) {
    try {
      await sequelize.authenticate()
      connected = true
      console.log('Sequelize successfully connected.')
      await sequelize.sync()
      console.log('Schema successfully synchronized.')
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
}
export default connectSequelize