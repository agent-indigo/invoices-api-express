import {
  Request,
  RequestHandler,
  Response
} from 'express'
import {Model} from 'sequelize'
import catchRequestErrors from '@/middleware/catchRequestErrors'
import userSqlModel from '@/models/userSqlModel'
import UserSqlRecord from '@/types/UserSqlRecord'
/**
 * @name    getUser
 * @desc    Get a single user
 * @route   GET /users/:id
 * @access  private/root
 */
const getUser: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<void> => {
  const user: Model<UserSqlRecord> | null = await userSqlModel.findByPk(request.params.id)
  if (!user) {
    response.status(404)
    throw new Error('User not found.')
  } else {
    response.status(200).json({
      id: user.get('id'),
      username: user.get('username'),
      role: user.get('role'),
      createdAt: user.get('createdAt'),
      updatedAt: user.get('updatedAt')
    })
  }
})
export default getUser