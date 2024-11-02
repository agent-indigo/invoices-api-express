import {Router} from 'express'
import addUser from '../services/users/addUser.js'
import changePassword from '../services/users/changePassword.js'
import deleteUser from '../services/users/deleteUser.js'
import listUsers from '../services/users/listUsers.js'
import login from '../services/users/login.js'
import logout from '../services/users/logout.js'
import resetPassword from '../services/users/resetPassword.js'
import authenticate from '../middleware/authenticate.js'
import authorize from '../middleware/authorize.js'
const usersRouter = Router()
usersRouter.post(
  '/login',
  login
)
usersRouter.use(authenticate)
usersRouter.use(authorize(
  'user',
  'root'
))
usersRouter.get(
  '/logout',
  logout
)
usersRouter.patch(
  '/changePassword',
  changePassword
)
usersRouter.use(authorize('root'))
usersRouter
.route('/')
.get(listUsers)
.post(addUser)
usersRouter.delete(
  '/:uuid',
  deleteUser
)
usersRouter.patch(
  '/resetPassword/:uuid',
  resetPassword
)
export default usersRouter