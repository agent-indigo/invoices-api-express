import sequelize from './sequelize.js'
const connectSequelize = async () => {
  let connected = false
  if (!connected) {
    try {
      await sequelize.authenticate()
      connected = true
      await sequelize.sync()
      console.log('Sequelize successfully connected.')
      console.log('Schema successfully synchronized.')
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
}
export default connectSequelize