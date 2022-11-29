import seoulService from '../services/seoul.service';

export default {
  cronSeoulData: async () => {
    try {
      // 1. 서울 도시데이터 API에서 데이터 가져오기
      const seoulData = await seoulService.getSeoulData();
      console.log(new Date());
      console.log(seoulData);
      const responseFromMongoDBPopData = await seoulService.savePopulationData(
        seoulData
      );
      console.log(responseFromMongoDBPopData);

      // 2. mongoDB에 데이터 넣기
    } catch (error) {
      console.log(error);
    }
    // console.log(new Date());
  }
};