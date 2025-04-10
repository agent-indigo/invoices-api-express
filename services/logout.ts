import {
  Request,
  RequestHandler,
  Response
} from 'express'
import catchRequestErrors from '@/middleware/catchRequestErrors'
/**
 * @name    logout
 * @desc    Log out the current user
 * @route   GET /users/logout
 * @access  private
 */
const logout: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<Response> => response
.clearCookie('token')
.status(204))
export default logout