import catchRequestErrors from '../middleware/catchRequestErrors.js'
import userSqlModel from '../models/userSqlModel.js'
/**
 * @name    deleteUser
 * @desc    Delete a user
 * @route   DELETE /users/:id
 * @access  private/root
 */
const deleteUser = catchRequestErrors(async (
  request,
  response
) => {
  const user = await userSqlModel.findByPk(request.params.id)
  if (!user) {
    response.status(404)
    throw new Error('User not found.')
  } else {
    await user.destroy()
    response.status(204)
  }
})
export default deleteUser