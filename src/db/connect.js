import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URL)
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`, {family:4})
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB;