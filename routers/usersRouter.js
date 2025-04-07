import {Router} from 'express'
import addUser from '../services/addUser.js'
import changePassword from '../services/changePassword.js'
import deleteUser from '../services/deleteUser.js'
import listUsers from '../services/listUsers.js'
import login from '../services/login.js'
import logout from '../services/logout.js'
import getUser from '../services/getUser.js'
import resetPassword from '../services/resetPassword.js'
import authenticate from '../middleware/authenticate.js'
import authorize from '../middleware/authorize.js'
const usersRouter = Router()
usersRouter.post(
  '/login',
  login
)
usersRouter.use(authenticate)
usersRouter.use(authorize('user'))
usersRouter.get(
  '/logout',
  logout
)
usersRouter.patch(
  '/changePassword',
  changePassword
)
usersRouter.use(authorize('root'))
usersRouter.get(
  '/',
  listUsers
)
usersRouter.post(
  '/',
  addUser
)
usersRouter.get(
  '/:id',
  getUser
)
usersRouter.delete(
  '/:id',
  deleteUser
)
usersRouter.patch(
  '/resetPassword/:id',
  resetPassword
)
export default usersRouter