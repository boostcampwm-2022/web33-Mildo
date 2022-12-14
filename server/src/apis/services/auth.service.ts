import authRepository from '../repositories/auth.repository';

export default {
  addBookmark: async (areaName: string, userId: string) => {
    try {
      await authRepository.addBookmark(areaName, userId);
    } catch (error) {
      console.log(error);
    }
  },
  deleteBookmark: async (areaName: string, userId: string) => {
    try {
      await authRepository.deleteBookmark(areaName, userId);
    } catch (error) {
      console.log(error);
    }
  }
};
