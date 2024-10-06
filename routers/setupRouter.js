import {
  Router
} from 'express'
import getStatus from '../services/setup/getStatus.js'
import createRoot from '../services/setup/createRoot.js'
const setupRouter = Router()
setupRouter.get(
  '/status',
  getStatus
)
setupRouter.post(
  '/root',
  createRoot
)
export default setupRouter