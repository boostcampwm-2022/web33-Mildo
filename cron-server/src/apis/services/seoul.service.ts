import { CityDataTypes, PopulationSchemaTypes } from './../types/interfaces';
import xml2js from 'xml2js';
import { getAxiosSeoulArea } from '../utils/axios';
import populationRepository from '../repositories/population.repository';
import areaService from './area.service';

interface jsonTypes {
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

const parseAreaName = (json: jsonTypes) => {
  return json['SeoulRtd.citydata']!['CITYDATA'][0];
};

const parsePopulationData = (json: jsonTypes) => {
  return json['SeoulRtd.citydata']!['CITYDATA'][0]['LIVE_PPLTN_STTS'][0][
    'LIVE_PPLTN_STTS'
  ][0];
};

const isVaildCityData = (json: jsonTypes) => {
  return json['SeoulRtd.citydata'];
};

export default {
  // getSeouldData: 서울 도시데이터 API를 기반으로 도시 데이터 가공 후 리턴
  getSeoulData: async (): Promise<CityDataTypes[]> => {
    const cityData: CityDataTypes[] = [];
    let allAreaNames = null;
    try {
      allAreaNames = await areaService.getAllAreaCoordinate();
      for (const areaName of Object.keys(allAreaNames!)) {
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
    } catch (error) {
      console.log(error);
    }
    return cityData;
  },

  // getSeouldData: 가공된 50곳의 cityData를 몽고DB에 저장하기
  savePopulationData: async (
    cityData: CityDataTypes[]
  ): Promise<PopulationSchemaTypes[] | null> => {
    const convertPopulationSchemaData: PopulationSchemaTypes[] = cityData.map(
      data => {
        return {
          ...data,
          populationMin: +data.populationMin,
          populationMax: +data.populationMax,
          populationTime: new Date(data.populationTime)
        };
      }
    );
    let responseData = null;
    try {
      responseData = await populationRepository.saveMany(
        convertPopulationSchemaData
      );
    } catch (error) {
      console.log(error);
    }
    return responseData;
  }
};
