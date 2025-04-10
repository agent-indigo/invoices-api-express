import {
  Request,
  RequestHandler,
  Response
} from 'express'
import catchRequestErrors from '@/middleware/catchRequestErrors'
import invoiceSqlModel from '@/models/invoiceSqlModel'
import InvoiceSqlRecord from '@/types/InvoiceSqlRecord'
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
  const invoice: InvoiceSqlRecord = JSON.parse(request.body)
  for (const key in invoice) if (!invoice[key]) {
    response.status(400)
    throw new Error(`Field "${key}" is empty.`)
  }
  response.status(201).json({
    ...(await invoiceSqlModel.create(invoice)).toJSON()
  })
})
export default addInvoice