import 'dotenv/config'
import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import userModel from '../models/userModel.js'
export const authenticate = asyncHandler(async (request, response, next) => {
  const token = request.cookies.token || request.header('Authorization')?.substring(7)
  if (token) {
    const user = await userModel.findByPk(jwt.verify(token, process.env.JWT_SECRET).pk)
    if (user) {
      request.pk = user.pk
      next()
    } else {
      response.status(401)
      throw new Error('User not found.')
    }
  } else {
    response.status(401)
    throw new Error('Token not found.')
  }
})
export const authorize = (...roles) => asyncHandler(async (request, response, next) => {
  if (!roles.includes((await userModel.findByPk(request.pk)).role)) {
    response.status(401)
    throw new Error('Permission denied.')
  } else {
    next()
  }
})