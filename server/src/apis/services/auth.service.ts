import authRepository from '../repositories/auth.repository';

export default {
  getUserInfo: async (userId: string) => {
    try {
      const userInfo = await authRepository.getUserInfo(userId);
      return userInfo;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
};
