import mongoose from "mongoose";

const connectMongodb = () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  mongoose.connect(process.env.MONGO_URI!.toString());
}

export default connectMongodb;