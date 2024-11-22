import {Sequelize} from 'sequelize'
const sequelize = new Sequelize({
  database: process.env.DB_NAME ?? 'invoices',
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PW ?? '',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      prefer: true
    }
  },
  logging: () => process.env.NODE_ENV === 'development'
})
export default sequelize