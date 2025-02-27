const sendErrorResponses = (
  error,
  request,
  response,
  next
) => response
.status(response.statusCode === 200 ? 500 : response.statusCode)
.json({
  message: error.message,
  stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
})
export default sendErrorResponses