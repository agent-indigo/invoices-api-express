import {Router} from 'express'
import {
  addInvoice,
  listInvoices,
  editinvoice,
  deleteInvoice
} from '../services/invoiceServices.js'
import {
  authenticate,
  authorize
} from '../middleware/securityHandler.js'
const invoicesRouter = Router()
invoicesRouter.use(authenticate)
invoicesRouter.use(authorize('user', 'root'))
invoicesRouter.get('/', listInvoices)
invoicesRouter.post('/', addInvoice)
invoicesRouter.put('/:pk', editinvoice)
invoicesRouter.delete('/:pk', deleteInvoice)
export default invoicesRouter