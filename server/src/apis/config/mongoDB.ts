import mongoose from 'mongoose';

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_CONNECT_URI!)
    .then(() => {
      console.log('[MONGODB] CONNECTED');
    })
    .catch((e: Error) => {
      console.log(`[MONGODB] ERROR ${e}`);
    });
};

export default connectMongoDB;
