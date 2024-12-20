import 'dotenv/config'
import {createWriteStream} from 'fs'
import {
  dirname,
  join
} from 'path'
import {fileURLToPath} from 'url'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import send404responses from './middleware/send404responses.js'
import sendErrorResponses from './middleware/sendErrorResponses.js'
import connectSequelize from './utilities/connectSequelize.js'
import invoicesRouter from './routers/invoicesRouter.js'
import usersRouter from './routers/usersRouter.js'
import setupRouter from './routers/setupRouter.js'
const app = express().use(
  express.json(),
  express.urlencoded({
    extended: true
  }),
  cookieParser(),
  cors(),
  helmet(),
  helmet.xssFilter(),
  hpp(),
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
  })
).use(
  '/users',
  usersRouter
).use(
  '/invoices',
  invoicesRouter
).use(
  '/setup',
  setupRouter
).use(
  send404responses,
  sendErrorResponses
)
process.env.NODE_ENV === 'development' && app.use(morgan(
  ':url,:method,:status,:response-time,:date[web]', {
    stream: createWriteStream(
      join(
        dirname(fileURLToPath(import.meta.url)),
        'log.csv'
      ), {
        flags: 'a'
      }
    )
  }
))
await connectSequelize()
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