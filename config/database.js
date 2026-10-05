import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("DATABASE_URL: ", process.env.DATABASE_URL)

        await mongoose.connect(process.env.DATABASE_URL)

        console.log('MONGODB connected.')
    } catch(e) {
        console.error('Failed to connect: ', e)
        process.exit(1)
    }
}

export default connectDB