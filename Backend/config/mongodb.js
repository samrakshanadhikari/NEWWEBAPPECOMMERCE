import mongoose from "mongoose";

const connectDB= async()=>{
    try {
        mongoose.connection.on("connected", ()=>{
            console.log("✅ Connected to the mongodb server");
        });

        mongoose.connection.on("error", (err)=>{
            console.error("❌ MongoDB connection error:", err.message);
        });

        mongoose.connection.on("disconnected", ()=>{
            console.warn("⚠️ MongoDB disconnected");
        });
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB connection established");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        console.error("Error details:", {
            message: error.message,
            name: error.name,
            code: error.code
        });
        // Don't exit - let server start but log the error
    }
}

export default connectDB