import {hashSync} from 'bcryptjs'
import {
  Request,
  RequestHandler,
  Response
} from 'express'
import {Model} from 'sequelize'
import catchRequestErrors from '@/middleware/catchRequestErrors'
import userSqlModel from '@/models/userSqlModel'
import UserSqlRecord from '@/types/UserSqlRecord'
import NewPassword from '@/types/NewPassword'
/**
 * @name    resetPassword
 * @desc    Reset a user's password
 * @route   PATCH /users/resetPassword/:id
 * @access  private/root
 */
const resetPassword: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<void> => {
  if (request.params.id === request.params.userId) {
    response.status(401)
    throw new Error('You can\'t change your own password this way.')
  } else {
    const user: Model<UserSqlRecord> | null = await userSqlModel.findByPk(request.params.id)
    if (!user) {
      response.status(404)
      throw new Error('User not found.')
    } else {
      const {
        newPassword,
        confirmNewPassword
      }: NewPassword = JSON.parse(request.body)
      if (!newPassword || !confirmNewPassword) {
        response.status(400)
        throw new Error('At least one field is empty.')
      } else if (newPassword !== confirmNewPassword) {
        response.status(400)
        throw new Error('New passwords do not match.')
      } else {
        user.set(
          'password',
          hashSync(
            newPassword,
            12
          )
        )
        await user.save()
        response.status(200).json({
          id: user.get('id'),
          username: user.get('username'),
          role: user.get('role'),
          createdAt: user.get('createdAt'),
          updatedAt: user.get('updatedAt')
        })
      }
    }
  }
})
export default resetPassword