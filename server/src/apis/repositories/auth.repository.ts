import User from '../models/User';
import { UserSchemaTypes } from '../types/interfaces';

export default {
  getUserInfo: async (userId: string): Promise<UserSchemaTypes | null> => {
    let userInfo: UserSchemaTypes | null = null;
    try {
      userInfo = await User.findOne({ _id: userId });
    } catch (error) {
      console.log(error);
    }
    return userInfo;
  }
};
