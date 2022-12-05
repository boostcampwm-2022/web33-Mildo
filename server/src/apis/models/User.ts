import mongoose, { Schema } from 'mongoose';
import { UserSchemaTypes } from '../types/interfaces';

const userSchema = new Schema<UserSchemaTypes>({
  snsId: {
    type: String,
    required: true,
    unique: true
  },
  provider: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  bookMarks: {
    type: [String],
    require: true,
    default: []
  }
});

const User = mongoose.model('user', userSchema);
export default User;
