import mongoose from 'mongoose';

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_CONNECT_URI!)
    .then(() => {
      console.log('mongodb 연결됨');
    })
    .catch((e: Error) => {
      console.log(e);
    });
};

export default connectMongoDB;
