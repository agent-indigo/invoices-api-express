import {Router} from 'express'
import addUser from '@/services/addUser'
import changePassword from '@/services/changePassword'
import deleteUser from '@/services/deleteUser'
import listUsers from '@/services/listUsers'
import login from '@/services/login'
import logout from '@/services/logout'
import getUser from '@/services/getUser'
import resetPassword from '@/services/resetPassword'
import authenticate from '@/middleware/authenticate'
import authorize from '@/middleware/authorize'
const usersRouter: Router = Router()
usersRouter.post(
  '/login',
  login
)
usersRouter.use(authenticate)
usersRouter.use(authorize(
  'root',
  'user'
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