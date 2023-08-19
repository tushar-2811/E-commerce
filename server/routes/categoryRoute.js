import express from 'express';
import { CreateCategoryController,
          showCategoryController
          ,updateCategoryController,
          singleCategoryController, 
          deleteCategoryController} 
from '../controllers/categoryController.js';

import {requireSignIn , isAdmin} from '../middlewares/authMiddleware.js';

const router = express.Router();

// create - new - category
router.post('/create-category' , requireSignIn , isAdmin , CreateCategoryController);


// update - existing - category
router.put('/update-category/:id' , requireSignIn , isAdmin , updateCategoryController);


// get all category
router.get('/get-category' , showCategoryController);

// to get single category
router.get('/single-category/:slug' , singleCategoryController);

// delete category
router.delete('/delete-category/:id' , requireSignIn , isAdmin , deleteCategoryController);

export default router;