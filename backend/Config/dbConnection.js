import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB Connected " + connect.connection.port);
    } catch (err) {
        console.log(err);
        process.exit(0);
    }
}

export default connectDB;