import {
  Request,
  RequestHandler,
  Response
} from 'express'
import catchRequestErrors from '@/middleware/catchRequestErrors'
import invoiceSqlModel from '@/models/invoiceSqlModel'
/**
 * @name    addInvoice
 * @desc    Add a invoice
 * @route   POST /invoices
 * @access  private
 */
const addInvoice: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response,
): Promise<void> => {
  response.status(201).json({
    ...(await invoiceSqlModel.create(JSON.parse(request.body))).toJSON()
  })
})
export default addInvoice