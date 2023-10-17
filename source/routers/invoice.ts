import express, { Request, Response, Router } from 'express';
 // Import your models
import { InvoiceModel } from '../model/invoices';
import { ProductModel } from '../model/product';

export const invoice_router = Router();
invoice_router.use(express.json());

//READ Invoices API
invoice_router.get('/invoice', async (req:Request , res: Response)=>{
  const findData = await InvoiceModel.find({}).populate('products').exec();

  res.send(findData);
})

// Create an invoice
invoice_router.post('/invoice', async (req: Request, res: Response) => {
  try {
    
    const invoice = new InvoiceModel();

   
    // invoice.invoice_id = req.body.invoiceId

    invoice.products = []; 
    // invoice.isDeleted = false;
    
    const savedInvoice =  await invoice.save();
    console.log(savedInvoice)
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Add a product to an invoice
// invoice_router.patch('/invoices/:invoiceId/addProduct', async (req: Request, res: Response) => {
//   try {
//     const { invoiceId } = req.params;
//     const productId = req.body;
    
//     // Update the invoice with the new product
//     const updatedInvoice = await InvoiceModel.findOne(
//       { invoiceId },
//       { $push: { products: product } },
//       { new: true }
//     );

//     console.log(updatedInvoice)

//     res.json(updatedInvoice);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add a product to the invoice' });
//   }
// });

// Other routes for editing, deleting, searching, and listing products and invoices

//update invoice
invoice_router.put("/invoice/:id" , async (req : Request , res : Response)=>{
  const findAndUpdateInvoice = await InvoiceModel.findOneAndUpdate(
    {_id : req.params.id },
    {
      $push : {
        products : req.body.productId
      }
    },
    {
      new : true
    })

    res.send(findAndUpdateInvoice);
})
