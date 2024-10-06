import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import UserModel from '../../models/UserModel.js'
/**
 * @name    listUsers
 * @desc    List all users
 * @route   GET /api/users
 * @access  private/root
 */
const listUsers = catchRequestErrors(async (
  request,
  response
) => response.status(200).json(await UserModel.findAll({
  attributes: {
    exclude: [
      'shadow'
    ]
  }
})))
export default listUsers