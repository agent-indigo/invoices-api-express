import {
  Request,
  RequestHandler,
  Response
} from 'express'
import catchRequestErrors from '@/middleware/catchRequestErrors'
import userSqlModel from '@/models/userSqlModel'
/**
 * @name    listUsers
 * @desc    List all users
 * @route   GET /users
 * @access  private/root
 */
const listUsers: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<Response> => response
.status(200)
.json(await userSqlModel.findAll({
  attributes: {
    exclude: [
      'password'
    ]
  }
})))
export default listUsers