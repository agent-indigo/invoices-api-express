import catchRequestErrors from '../middleware/catchRequestErrors.js'
import userSqlModel from '../models/userSqlModel.js'
/**
 * @name    getUser
 * @desc    Get a single user
 * @route   GET /users/:id
 * @access  private/root
 */
const getUser = catchRequestErrors(async (
  request,
  response
) => {
  const user = await userSqlModel.findByPk(request.params.id)
  if (!user) {
    response.status(404)
    throw new Error('User not found.')
  } else {
    response.status(200).json({
      id: user.get('id'),
      username: user.get('username'),
      role: user.get('role')
    })
  }
})
export default getUser