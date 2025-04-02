import {Router} from 'express'
import getConfigStatus from '../services/getConfigStatus.js'
import createRootUser from '../services/createRootUser.js'
const configRouter = Router()
configRouter.get(
  '/status',
  getConfigStatus
)
configRouter.post(
  '/rootUserPassword',
  createRootUser
)
export default configRouter