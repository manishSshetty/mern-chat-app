import mongoose  from "mongoose";

const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Db connected")
    } catch (error) {
       console.log(`db error ${error}`)
    }
}
 export default connectDb
