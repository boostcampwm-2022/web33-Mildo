import {
  CityDataTypes,
  PopulationSchemaTypes,
  AreaPopulationTypes,
  AreaCoordinateTypes,
  RedisAllAreasResponseTypes
} from './../types/interfaces';
import { AREA_NAMES } from '../config/area.config';
import xml2js from 'xml2js';
import { getAxiosSeoulArea } from '../utils/axios';
import populationRepository from '../repositories/population.repository';
import areaService from '../services/area.service';
import redisService from './redis.service';

interface PopulationResponseTypes {
  [areaName: string]: {
    populationMax: number;
    populationMin: number;
    populationLevel: string;
    populationTime: Date;
    latitude: number;
    longitude: number;
  };
}

interface JsonTypes {
  'SeoulRtd.citydata':
    | {
        CITYDATA: {
          AREA_NM: string;
          LIVE_PPLTN_STTS: {
            LIVE_PPLTN_STTS: {
              AREA_PPLTN_MIN: string;
              AREA_PPLTN_MAX: string;
              AREA_CONGEST_LVL: string;
              PPLTN_TIME: string;
            }[];
          }[];
        }[];
      }
    | undefined;
}

const parseAreaName = (json: JsonTypes) => {
  return json['SeoulRtd.citydata']!['CITYDATA'][0];
};

const parsePopulationData = (json: JsonTypes) => {
  return json['SeoulRtd.citydata']!['CITYDATA'][0]['LIVE_PPLTN_STTS'][0][
    'LIVE_PPLTN_STTS'
  ][0];
};

const isVaildCityData = (json: JsonTypes) => {
  return json['SeoulRtd.citydata'];
};

const mergeAreaCoordinatePopulation = (
  areaCoordinate: AreaCoordinateTypes,
  areaPopulation: AreaPopulationTypes
): PopulationResponseTypes => {
  const result: PopulationResponseTypes = {};
  Object.keys(areaCoordinate).map((areaName: string) => {
    result[areaName] = {
      ...areaPopulation[areaName],
      ...areaCoordinate[areaName]
    };
  });
  return result;
};

export default {
  getCityData: async (): Promise<CityDataTypes[]> => {
    const cityData: CityDataTypes[] = [];
    for (const areaName in AREA_NAMES) {
      const cityDataXml = await getAxiosSeoulArea(areaName);
      const cityDataJson = await xml2js.parseStringPromise(cityDataXml);
      if (!isVaildCityData(cityDataJson)) {
        cityData.push({
          areaName: areaName,
          populationMin: '',
          populationMax: '',
          populationLevel: '',
          populationTime: ''
        });
        continue;
      }
      const { AREA_NM } = parseAreaName(cityDataJson);
      const { AREA_PPLTN_MIN, AREA_PPLTN_MAX, AREA_CONGEST_LVL, PPLTN_TIME } =
        parsePopulationData(cityDataJson);

      cityData.push({
        areaName: AREA_NM[0],
        populationMin: AREA_PPLTN_MIN[0],
        populationMax: AREA_PPLTN_MAX[0],
        populationLevel: AREA_CONGEST_LVL[0],
        populationTime: PPLTN_TIME[0]
      });
    }
    return cityData;
  },
  saveAreaPopulation: async (cityData: CityDataTypes[]) => {
    const newCityData: PopulationSchemaTypes[] = cityData.map(data => {
      return {
        ...data,
        populationMin: +data.populationMin,
        populationMax: +data.populationMax,
        populationTime: new Date(data.populationTime)
      };
    });
    try {
      const areaPopulation = await populationRepository.saveMany(newCityData);
      console.log(`[MONGODB] SAVE MANY ${areaPopulation}`);
      return true;
    } catch (e) {
      console.log(`[MONGODB] ERROR ${e}`);
      return false;
    }
  },
  getRecentAreaInfo: async (): Promise<PopulationResponseTypes | null> => {
    // redis에서 최근순 데이터 50개 가져오기
    const recentAreaPopulation = await redisService.getRecentAreaPopulation();
    // 위도/경도 50개 가져오기
    const allAreaCoordinate = await areaService.getAllAreaCoordinate();
    if (recentAreaPopulation && allAreaCoordinate) {
      return mergeAreaCoordinatePopulation(
        allAreaCoordinate,
        recentAreaPopulation
      );
    }
    return null;
  },
  getSortedPastInformation: async (
    pastInfomation: RedisAllAreasResponseTypes
  ) => {
    const initObject: RedisAllAreasResponseTypes = {};
    const sortedInformation = Object.keys(pastInfomation)
      .sort()
      .reverse()
      .reduce((prev, key) => {
        prev[key] = pastInfomation[key];
        return prev;
      }, initObject);

    return sortedInformation;
  },
  getPastAreaPopulation: async (
    areaName: string
  ): Promise<RedisAllAreasResponseTypes | null> => {
    const sortedInfomation: RedisAllAreasResponseTypes = {};
    const pastInfo = await populationRepository.findPastInfo(areaName);
    pastInfo.forEach(info => {
      sortedInfomation[info.populationTime.toISOString()] = {
        populationLevel: info.populationLevel,
        populationMax: info.populationMax,
        populationMin: info.populationMin
      };
    });
    return sortedInfomation;
  }
};
