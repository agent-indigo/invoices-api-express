import {
  compareSync,
  hashSync
} from 'bcryptjs'
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
 * @name    changePassword
 * @desc    Change the current user's password
 * @route   PATCH /users/changePassword
 * @access  private
 */
const changePassword: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<void> => {
  const user: Model<UserSqlRecord> | null = await userSqlModel.findByPk(request.params.userId)
  if (!user) {
    response.status(404)
    throw new Error('User not found.')
  } else {
    const {
      currentPassword,
      newPassword,
      confirmNewPassword
    }: NewPassword = JSON.parse(request.body)
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      response.status(400)
      throw new Error('At least one field is empty.')
    } else if (!compareSync(
      currentPassword,
      user.getDataValue('password')
    )) {
      response.status(401)
      throw new Error('Incorrect password.')
    } else if (newPassword !== confirmNewPassword) {
      response.status(400)
      throw new Error('New passwords do not match.')
    } else {
      user.setDataValue(
        'password',
        hashSync(
          newPassword,
          12
        )
      )
      await user.save()
      response.status(200).json({
        id: user.getDataValue('id'),
        username: user.getDataValue('username'),
        role: user.getDataValue('role'),
        createdAt: user.getDataValue('createdAt'),
        updatedAt: user.getDataValue('updatedAt')
      })
    }
  }
})
export default changePassword