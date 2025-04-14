import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import url from 'url'
import express, {Express} from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import send404responses from '@/middleware/send404responses'
import sendErrorResponses from '@/middleware/sendErrorResponses'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import invoicesRouter from '@/routers/invoicesRouter'
import usersRouter from '@/routers/usersRouter'
import configRouter from '@/routers/configRouter'
const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(helmet.xssFilter())
app.use(hpp())
app.use(rateLimit({
  limit: 100
}))
process.env.NODE_ENV === 'development' && app.use(morgan(
  ':url,:method,:status,:response-time,:date[web]', {
    stream: fs.createWriteStream(
      path.join(
        path.dirname(url.fileURLToPath(import.meta.url)),
        'log.csv'
      ), {
        flags: 'a'
      }
    )
  }
))
app.use(
  '/config',
  configRouter
)
app.use(
  '/invoices',
  invoicesRouter
)
app.use(
  '/users',
  usersRouter
)
app.use(send404responses)
app.use(sendErrorResponses)
await connectToSqlDb()
app.listen(
  8080,
  () => console.log(`Listening on http${
    process.env.NODE_ENV === 'production' ? 's' : ''
  }://${
    process.env.DOMAIN ?? 'localhost'
  }:8080 in ${
    process.env.NODE_ENV
  } mode.`)
)