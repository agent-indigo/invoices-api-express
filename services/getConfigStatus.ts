import {
  Request,
  RequestHandler,
  Response
} from 'express'
import catchRequestErrors from '@/middleware/catchRequestErrors'
import userSqlModel from '@/models/userSqlModel'
/**
 * @name    getConfigStatus
 * @desc    Get the configuration status (Does the root user exist?)
 * @route   GET /config/status
 * @access  public
 */
const getConfigStatus: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<Response> => response.status(200).json({
  rootExists: await userSqlModel.findOne({
    where: {
      role: 'root'
    }
  }) !== null
}))
export default getConfigStatus