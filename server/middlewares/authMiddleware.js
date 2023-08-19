import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// protected routes based on token

export const requireSignIn = async (req,res,next) => {
    try {

        const decode = await JWT.verify(
            req.headers.authorization
            ,process.env.JWT_SECRET
        );
        
        req.user = decode;
        next();
        
        
    } catch (error) {
        console.log("error in auth middleware",error);
    }
};


export const isAdmin = async (req,res,next) => {
    try {
       const user = await userModel.findById(req.user._id);
       if(user.role !== 1){
          return res.status(401).send({
            success: false,
            message : "unAuthorized Acess"
          })
         
       }

       else{
          next();
     }
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error
        })
    }
}