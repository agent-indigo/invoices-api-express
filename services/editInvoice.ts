import {
  Request,
  RequestHandler,
  Response
} from 'express'
import {Model} from 'sequelize'
import catchRequestErrors from '@/middleware/catchRequestErrors'
import invoiceSqlModel from '@/models/invoiceSqlModel'
import InvoiceSqlRecord from '@/types/InvoiceSqlRecord'
/**
 * @name    editInvoice
 * @desc    Edit a Invoice
 * @route   PATCH /invoices/:id
 * @access  private
 */
const editinvoice: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<void> => {
  const invoice: Model<InvoiceSqlRecord> | null = await invoiceSqlModel.findByPk(request.params.id)
  if (!invoice) {
    response.status(404)
    throw new Error('Invoice not found.')
  } else {
    await invoice.update(await request.json())
    response.status(200).json(invoice)
  }
})
export default editinvoice