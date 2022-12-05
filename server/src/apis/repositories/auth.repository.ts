import User from '../models/User';

export default {
  addBookmark: async (areaName: string, userId: string) => {
    try {
      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { bookmarks: areaName } }
      );
    } catch (error) {
      console.log(error);
    }
  },
  deleteBookmark: async (areaName: string, userId: string) => {
    try {
      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { bookmarks: areaName } }
      );
    } catch (error) {
      console.log(error);
    }
  }
};
