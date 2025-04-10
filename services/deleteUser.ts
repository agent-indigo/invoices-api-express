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
 * @name    deleteUser
 * @desc    Delete a user
 * @route   DELETE /users/:id
 * @access  private/root
 */
const deleteUser: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<void> => {
  const user: Model<UserSqlRecord> | null = await userSqlModel.findByPk(request.params.id)
  if (!user) {
    response.status(404)
    throw new Error('User not found.')
  } else {
    await user.destroy()
    response.status(204)
  }
})
export default deleteUser