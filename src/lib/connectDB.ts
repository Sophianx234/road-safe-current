import mongoose, { connection } from "mongoose";

export function connectDB() {
  try{

    const uri = process.env.DATABASE_LOCAL;
    if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable");
    }
    
    return mongoose.connect(uri);
  }catch(err){
    console.error("Failed to connect to MongoDB:", err);
    
  }
}