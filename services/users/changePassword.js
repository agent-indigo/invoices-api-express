import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import UserModel from '../../models/UserModel.js'
/**
 * @name    changePassword
 * @desc    Change the current user's password
 * @route   PATCH /api/users/changePassword
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
  } = request.body
  const user = await UserModel.findByPk(jwt.verify(
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
    } else if (!await bcrypt.compare(
      currentPassword,
      user.shadow
    )) {
      response.status(401)
      throw new Error('Incorrect password.')
    } else if (newPassword !== confirmNewPassword) {
      response.status(400)
      throw new Error('New passwords do not match.')
    } else {
      user.shadow = await bcrypt.hash(
        newPassword,
        10
      )
      await user.save()
      response.status(202).json({
        message: 'Password changed.'
      })
    }
  }
})
export default changePassword