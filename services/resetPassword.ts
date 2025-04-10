import bcrypt from 'bcryptjs'
import {
  Request,
  RequestHandler,
  Response
} from 'express'
import jwt from 'jsonwebtoken'
import {Model} from 'sequelize'
import catchRequestErrors from '@/middleware/catchRequestErrors'
import userSqlModel from '@/models/userSqlModel'
import UserSqlRecord from '@/types/UserSqlRecord'
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
  const {
    id,
    newPassword,
    confirmNewPassword
  } = await request.json()
  const user: Model<UserSqlRecord> | null = await userSqlModel.findByPk(id)
  if (!user) {
    response.status(404)
    throw new Error('User not found.')
  } else {
    if (await userSqlModel.findByPk(jwt.verify(
      request.cookies.token ?? request.header('Authorization')?.substring(7),
      process.env.JWT_SECRET ?? 'd3v3l0pm3nt53cr3tk3yn0t53cur3@t@11n3v3ru53!npr0duct!0n3v3r!!!'
    ).id).get('id') === user.get('id')) {
      response.status(401)
      throw new Error('You can\'t change your own password this way.')
    } else if (!newPassword || !confirmNewPassword) {
      response.status(400)
      throw new Error('At least one field is empty.')
    } else if (newPassword !== confirmNewPassword) {
      response.status(400)
      throw new Error('New passwords do not match.')
    } else {
      user.set(
        'password',
        await bcrypt.hash(
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
})
export default resetPassword