import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import catchRequestErrors from '../middleware/catchRequestErrors.js'
import userSqlModel from '../models/userSqlModel.js'
/**
 * @name    changePassword
 * @desc    Change the current user's password
 * @route   PATCH /users/changePassword
 * @access  private
 */
const changePassword = catchRequestErrors(async (
  request,
  response
) => {
  const {
    currentPassword,
    newPassword,
    confirmNewPassword
  } = await request.json()
  const user = await userSqlModel.findByPk(jwt.verify(
    request.cookies.token || request.header('Authorization')?.substring(7),
    process.env.JWT_SECRET
  ).id)
  if (!user) {
    response.status(404)
    throw new Error('User not found.')
  } else {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      response.status(400)
      throw new Error('At least one field is empty.')
    } else if (!bcrypt.compare(
      currentPassword,
      user.get('password')
    )) {
      response.status(401)
      throw new Error('Incorrect password.')
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
        message: 'Password changed.'
      })
    }
  }
})
export default changePassword