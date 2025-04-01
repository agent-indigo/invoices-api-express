import catchRequestErrors from '../middleware/catchRequestErrors.js'
import userSqlModel from '../models/userSqlModel.js'
/**
 * @name    getConfigStatus
 * @desc    Get the setup status (Does the root user exist?)
 * @route   GET /api/setup/status
 * @access  public
 */
const getConfigStatus = catchRequestErrors(async (
  request,
  response
) => response.status(200).json({
  rootExists: await userSqlModel.findOne({
    where: {
      role: 'root'
    }
  }) !== null
}))
export default getConfigStatus