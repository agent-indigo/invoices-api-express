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
 * @name    getInvoice
 * @desc    Get a single invoice
 * @route   GET /invoices/:id
 * @access  private
 */
const getInvoice: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<void> => {
  const invoice: Model<InvoiceSqlRecord> | null = await invoiceSqlModel.findByPk(request.params.id)
  if (!invoice) {
    response.status(404)
    throw new Error('Invoice not found.')
  } else {
    response.status(200).json({
      ...invoice.toJSON()
    })
  }
})
export default getInvoice