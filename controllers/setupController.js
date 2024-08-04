import bcrypt from 'bcryptjs'
import asyncHandler from '../middleware/asyncHandler.js'
import userModel from '../models/userModel.js'
/**
 * @name    getStatus
 * @desc    Get the config status (Does the root user exist?)
 * @route   GET /api/setup/status
 * @access  public
 */
export const getStatus = asyncHandler(async (request, response) => response.status(200).json(!await userModel.findOne({where: {role: 'root'}})))
/**
 * @name    createRoot
 * @desc    Create the root user
 * @route   POST /api/setup/root
 * @access  public
 */
export const createRoot = asyncHandler(async (request, response) => {
  const {password, confirmPassword} = request.body
  if (await userModel.findOne({where: {role: 'root'}})) {
    response.status(403)
    throw new Error('Root user already exists.')
  } else {
    if (password !== confirmPassword) {
      response.status(403)
      throw new Error('Passwords do not match')
    } else if (!password || !confirmPassword) {
      response.status(403)
      throw new Error('At least one field is empty')
    } else {
      await userModel.create({
        name: 'root',
        shadow: await bcrypt.hash(password, 10),
        role: 'root'
      })
      response.status(201).json({message: 'User "root" created.'})
    }
  }
})