import seoulService from '../services/seoul.service';

export default {
  cronSeoulData: async () => {
    try {
      console.log('크론 시작');

      // 1. 서울 도시데이터 API에서 데이터 가져오기
      const seoulData = await seoulService.getSeoulData();

      console.log(seoulData);

      // 2. mongoDB에 데이터 넣기
      const responseFromMongoDBPopData = await seoulService.savePopulationData(
        seoulData
      );

      console.log(responseFromMongoDBPopData);

      console.log('크론 끝');

      // 3. redis에 데이터 넣기
    } catch (error) {
      console.log(error);
    }
  }
};
