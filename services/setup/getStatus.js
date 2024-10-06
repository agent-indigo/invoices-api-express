import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import UserModel from '../../models/UserModel.js'
/**
 * @name    getStatus
 * @desc    Get the setup status (Does the root user exist?)
 * @route   GET /api/setup/status
 * @access  public
 */
const getStatus = catchRequestErrors(async (
  request,
  response
) => response
.status(200)
.json({
  rootExists: await UserModel.findOne({
    where: {
      role: 'root'
    }
  }) !== null
}))
export default getStatus