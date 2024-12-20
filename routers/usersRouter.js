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
const usersRouter = Router().post(
  '/login',
  login
).use(authenticate).use(authorize(
  'user',
  'root'
)).get(
  '/logout',
  logout
).patch(
  '/changePassword',
  changePassword
).use(authorize('root'))
.route('/')
.get(listUsers)
.post(addUser).delete(
  '/:id',
  deleteUser
).patch(
  '/resetPassword/:id',
  resetPassword
)
export default usersRouter