import {Op} from 'sequelize'
import catchRequestErrors from '../middleware/catchRequestErrors.js'
import userSqlModel from '../models/userSqlModel.js'
/**
 * @name    getConfigStatus
 * @desc    Get the configuration status (Does the root user exist?)
 * @route   GET /config/status
 * @access  public
 */
const getConfigStatus = catchRequestErrors(async (
  request,
  response
) => response.status(200).json({
  rootExists: await userSqlModel.findOne({
    where: {
      roles: {
        [Op.contains]: ['root']
      }
    }
  }) !== null
}))
export default getConfigStatus