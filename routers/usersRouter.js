import {Router} from 'express'
import {
  login,
  logout,
  changePassword,
  resetPassword,
  addUser,
  listUsers,
  deleteUser
} from '../controllers/usersController.js'
import {
  authenticate,
  authorize
} from '../middleware/securityHandler.js'
const usersRouter = Router()
usersRouter.post('/login', login)
usersRouter.use(authenticate)
usersRouter.use(authorize('user', 'root'))
usersRouter.get('/logout', logout)
usersRouter.patch('/changePassword', changePassword)
usersRouter.use(authorize('root'))
usersRouter.post('/', addUser)
usersRouter.get('/', listUsers)
usersRouter.delete('/:pk', deleteUser)
usersRouter.patch('/resetPassword/:pk', resetPassword)
export default usersRouter