import mongoose, { mongo } from "mongoose";

mongoose.connect("mongodb+srv://tusharrawat52:lSyJk6ZrkfesyxpL@cluster0.tz8zdjw.mongodb.net/Ecommerce?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on('error' , console.error.bind(console,'error in connecting to db'));

db.once('open' , function(){
    console.log("connected to database :: mongodb");
});


export default db;