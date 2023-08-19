import express from 'express';
import { loginController, registerController, updateProfileController } from '../controllers/authController.js';
import { requireSignIn,isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/register' , registerController);
router.post('/login' , loginController);

// protected user route
router.get('/user-auth', requireSignIn ,(req,res)=> {
    res.status(200).send({
        ok : true
    })
} );

router.put('/profile' , requireSignIn , updateProfileController);


// protected admin route
router.get('/admin-auth', requireSignIn, isAdmin ,(req,res)=> {
    res.status(200).send({
        ok : true
    })
} );




export default router;