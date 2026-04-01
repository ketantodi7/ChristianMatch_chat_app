import mongoose from "mongoose";

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGO_URL, {
    }).then(() => {
        console.log("MongoDB CONNECTED");
    })
}

export default connectToDB;