import {createWriteStream} from 'fs'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import {
  notFound,
  errorHandler
} from './middleware/errorHandler.js'
import connectToSQLdb from './utilities/connectToSQLdb.js'
import invoicesRouter from './routers/invoicesRouter.js'
import usersRouter from './routers/usersRouter.js'
import setupRouter from './routers/setupRouter.js'
connectToSQLdb()
const server = express()
server.use(morgan(
  ':url,:method,:status,:response-time,:date[web]', {
    stream: createWriteStream(
      join(
        dirname(fileURLToPath(import.meta.url)),
        'log.csv'
      ),
      {flags: 'a'}
    )
  }
))
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cookieParser())
server.use(cors())
server.use(helmet())
server.use(helmet.xssFilter())
server.use(hpp())
server.use(rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
}))
server.use('/api/users', usersRouter)
server.use('/api/invoices', invoicesRouter)
server.use('/api/setup', setupRouter)
server.use(notFound)
server.use(errorHandler)
server.listen(
  8080, () => console.log(`Listening on port 8080 in ${
    process.env.NODE_ENV
  } mode.`)
)