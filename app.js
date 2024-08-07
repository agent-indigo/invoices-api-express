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
const app = express()
app.use(morgan(
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
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(helmet.xssFilter())
app.use(hpp())
app.use(rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
}))
app.use('/api/users', usersRouter)
app.use('/api/invoices', invoicesRouter)
app.use('/api/setup', setupRouter)
app.use(notFound)
app.use(errorHandler)
app.listen(
  8080, () => console.log(`Listening on port 8080 in ${
    process.env.NODE_ENV
  } mode.`)
)