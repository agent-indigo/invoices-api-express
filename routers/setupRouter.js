import {Router} from 'express'
import {
  getStatus,
  createRoot
} from '../controllers/setupController.js'
const setupRouter = Router()
setupRouter.get('/status', getStatus)
setupRouter.post('/root', createRoot)
export default setupRouter