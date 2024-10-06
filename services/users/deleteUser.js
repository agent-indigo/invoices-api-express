import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import UserModel from '../../models/UserModel.js'
/**
 * @name    deleteUser
 * @desc    Delete a user
 * @route   DELETE /api/users/:uuid
 * @access  private/root
 */
const deleteUser = catchRequestErrors(async (
  request,
  response
) => {
  const user = await UserModel.findByPk(request.params.uuid)
  if (!user) {
    response.status(404)
    throw new Error('User not found.')
  } else if (user.role === 'root') {
    response.status(403)
    throw new Error('The root user shouldn\'t be deleted.')
  } else {
    await user.destroy()
    response.status(204).json({
      message: 'User deleted.'
    })
  }
})
export default deleteUser