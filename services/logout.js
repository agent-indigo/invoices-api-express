/**
 * @name    logout
 * @desc    Log out the current user
 * @route   GET /api/users/logout
 * @access  private
 */
const logout = (
  request,
  response
) => {
  response.clearCookie('token')
  response.status(200).json({
    message: 'Logged out.'
  })
}
export default logout