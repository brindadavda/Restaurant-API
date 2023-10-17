import { Schema, model, Document } from 'mongoose';
import { productSchema, I_Product } from './product';

// Invoice Schema
interface Invoice {
  invoice_id : String;
  products: Array<I_Product>; // Array of products associated with the invoice
  isDeleted: boolean;
  // Add other invoice details as needed
}

const invoiceSchema = new Schema<Invoice & Document>({
  invoice_id : String,
  products: [
    {
      type: Object,
      ref: 'Product'
    }
  ], // Embed products in the invoice
  isDeleted: Boolean,
},{
  timestamps : true
});

export const InvoiceModel = model<Invoice & Document>('Invoice', invoiceSchema);
