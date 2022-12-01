import seoulService from '../services/seoul.service';

export default {
  cronSeoulData: async () => {
    try {
      console.log(new Date(), '크론 시작');

      // 1. 서울 도시데이터 API에서 데이터 가져오기
      const seoulData = await seoulService.getSeoulData();

      // 2. mongoDB에 데이터 넣기
      await seoulService.savePopulationData(seoulData);

      console.log(new Date(), '크론 끝');
    } catch (error) {
      console.log(error);
    }
  }
};
