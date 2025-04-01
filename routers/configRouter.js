import {Router} from 'express'
import getConfigStatus from '../services/getConfigStatus.js'
import createRootUser from '../services/createRootUser.js'
const configRouter = Router()
configRouter.get(
  '/status',
  getConfigStatus
)
configRouter.post(
  '/rootpw',
  createRootUser
)
export default configRouter