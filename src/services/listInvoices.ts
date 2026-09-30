import {
  Request,
  RequestHandler,
  Response
} from 'express'
import catchRequestErrors from '@/middleware/catchRequestErrors'
import invoiceSqlModel from '@/models/invoiceSqlModel'
/**
 * @name    listInvoices
 * @desc    List all invoices
 * @route   GET /invoices
 * @access  private
 */
const listInvoices: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<void> => {
  response.status(200).json(await invoiceSqlModel.findAll())
})
export default listInvoices