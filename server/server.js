import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import db from './config/mongoose.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';



const app = express();

// config env
dotenv.config();
const PORT = process.env.PORT;



// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));




app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/category' , categoryRoutes);
app.use('/api/v1/product' , productRoutes );


app.listen(PORT , (err) => {
    if(err){
        console.log("error in running server",err);
    }
    console.log(`The server is running on port : ${PORT}`);
})