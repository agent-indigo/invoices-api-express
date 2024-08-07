import {Router} from 'express'
import {
  getStatus,
  createRoot
} from '../services/setupServices.js'
const setupRouter = Router()
setupRouter.get('/status', getStatus)
setupRouter.post('/root', createRoot)
export default setupRouter