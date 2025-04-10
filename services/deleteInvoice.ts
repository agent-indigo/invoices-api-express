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
 * @name    deleteInvoice
 * @desc    Delete a invoice
 * @route   DELETE /invoices/:id
 * @access  private
 */
const deleteInvoice: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<void> => {
  const invoice: Model<InvoiceSqlRecord> | null = await invoiceSqlModel.findByPk(request.params.id)
  if (!invoice) {
    response.status(404)
    throw new Error('Invoice not found.')
  } else {
    await invoice.destroy()
    response.status(204)
  }
})
export default deleteInvoice