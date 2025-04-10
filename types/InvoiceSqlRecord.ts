import SqlRecord from '@/types/SqlRecord'
export default interface InvoiceSqlRecord extends SqlRecord {
  vendor: String
  subtotal: Number
  hst: Number
  total: Number
  invoiceId: String
  date: Date
}