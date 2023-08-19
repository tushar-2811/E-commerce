import express from 'express';
import { braintreePaymentController, braintreeTokenController, deleteProductController, getProductController, productPhotoController, singleProductController, updateProductController, uploadProductController } from '../controllers/productController.js';
import { requireSignIn , isAdmin } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable'

const router = express.Router();

// To upload products
router.post('/upload-product' , requireSignIn , isAdmin , formidable() , uploadProductController);


// To get products
router.get('/get-product' , getProductController);

// To get single product
router.get('/single-product/:slug' , singleProductController);


// To get Photo (by using product id)
router.get('/product-photo/:pid' , productPhotoController);

router.delete('/product-delete/:id' , deleteProductController);



// I will handle it later ------------
router.put('/update-product/:id' , updateProductController);



// payments-routes
router.get('/braintree/token' , braintreeTokenController);

router.post('/braintree/payment' ,requireSignIn , braintreePaymentController);

export default router;