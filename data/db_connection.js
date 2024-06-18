import mongoose from "mongoose";

const db_URL = process.env.MONGO_URI;

export const connectDB = () =>{
    mongoose.connect(db_URL)
  .then((c) => {
    console.log(`Database connected with ${c.connection.host}`);
  })
  .catch((err) => console.log(err));
} 
