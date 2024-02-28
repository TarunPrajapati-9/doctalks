const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB Connected " + connect.connection.port);
    } catch (err) {
        console.log(err);
        process.exit(0);
    }
}

module.exports = connectDB;