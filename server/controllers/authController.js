import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import JWT from 'jsonwebtoken';



// To register an new user
export const registerController = async (req,res) => {

    try{
        const {name,email,password,phone,address} = req.body;

        if(!name || !email || !password || !phone || !address){
           return res.send({
                message : "please enter complete information"
            })
        }
        
        const existedUser = await userModel.findOne({email : email});

        if(existedUser){
            return res.status(200).send({
                success : true,
                message : "User already exists, please Login"
            })
        }

       const hashedPassword = await hashPassword(password);

       const newUser = await userModel.create({name,email,phone,address,password : hashedPassword});

       return res.status(201).send({
         success : true,
         message : "user registered successfully",
         newUser
       })

    }catch(error){
        res.status(500).send({
            success: false,
            message : "error in registering user",
            error
        })
    }
}



// To login an existed user
export const loginController = async (req,res) => {
    try{

        const {email , password} = req.body;

        if(!email || !password){
            return res.status(404).send({
                success : false,
                message : "enter complete details"
            })
        }

        const existedUser = await userModel.findOne({email : email});

        if(!existedUser){
            return res.status(404).send({
                success : false,
                message : "email not registered"
            })
        }

        const checkPassword = await comparePassword(password,existedUser.password);

        if(!checkPassword){
            return res.status(200).send({
                success : false,
                message : "Invalid password"
            })
        }


        // now create token
        const token = JWT.sign({_id : existedUser._id} , process.env.JWT_SECRET , {expiresIn : "7d"})
          
        return res.status(200).send({
            success : true,
            message : "login successfully",
            user : {
                name : existedUser.name,
                phone : existedUser.phone,
                address : existedUser.address,
                role : existedUser.role,
                email : existedUser.email
            },
            token
         });
       



    }catch(error){
        return res.status(500).send({
            success : false,
            message : "error in login",
            error
        })
    }
}

// to update profile (will handle it later)
export const updateProfileController = async (req,res) => {
   
}