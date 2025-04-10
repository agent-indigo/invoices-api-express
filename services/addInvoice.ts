import {
  Request,
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
const addInvoice: Function = catchRequestErrors(async (
  request: Request,
  response: Response,
): Promise<void> => {
  const invoice: any = await request.json()
  for (const key in invoice) if (!invoice[key]) {
    response.status(400)
    throw new Error(`Field "${key}" is empty.`)
  }
  response.status(201).json(await invoiceSqlModel.create(invoice))
})
export default addInvoice