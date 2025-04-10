import {
  Request,
  Response
} from 'express'
/**
 * @name    logout
 * @desc    Log out the current user
 * @route   GET /users/logout
 * @access  private
 */
const logout: Function = (
  request: Request,
  response: Response
): Response => response
.clearCookie('token')
.status(204)
export default logout