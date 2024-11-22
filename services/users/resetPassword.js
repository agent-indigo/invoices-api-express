import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import UserModel from '../../models/UserModel.js'
/**
 * @name    resetPassword
 * @desc    Reset a user's password
 * @route   PATCH /api/users/resetPassword/:id
 * @access  private/root
 */
const resetPassword = catchRequestErrors(async (
  request,
  response
) => {
  const {
    id,
    newPassword,
    confirmNewPassword
  } = request.body
  const user = await UserModel.findByPk(id)
  if (!user) {
    response.status(404)
    throw new Error('User not found.')
  } else {
    if (await UserModel.findByPk(jwt.verify(
      request.cookies.token || request.header('Authorization')?.substring(7),
      process.env.JWT_SECRET
    ).id).id === user.id) {
      response.status(403)
      throw new Error('You can\'t change your own password this way.')
    } else if (!newPassword || !confirmNewPassword) {
      response.status(400)
      throw new Error('At least one field is empty.')
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
        message: 'Password reset.'
      })
    }
  }
})
export default resetPassword