import mongoose from 'mongoose';

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_CONNECT_URI!)
    .then(() => {
      console.log('[MONDODB] CONNECTED');
    })
    .catch((e: Error) => {
      console.log(`[MONDODB] ERROR ${e}`);
    });
};

export default connectMongoDB;
