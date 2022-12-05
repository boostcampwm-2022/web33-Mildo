import User from '../models/User';

export default {
  addBookmark: async (areaName: string, userId: string) => {
    try {
      const data = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { bookmarks: areaName } }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
};
