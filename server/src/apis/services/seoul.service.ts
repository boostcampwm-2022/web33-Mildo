import { CityDatatypes, PopulationSchemaTypes } from './../types/interfaces';
import { TEST_AREA_NAMES } from '../config/area.config';
// import { AREA_NAMES } from '../config/area.config';
import xml2js from 'xml2js';
import { getAxiosSeoulArea } from '../utils/axios';
import populationRepository from '../repositories/population.repository';

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
  getCityData: async (): Promise<CityDatatypes[]> => {
    const cityData: CityDatatypes[] = [];
    for (const areaName in TEST_AREA_NAMES) {
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
  savePopulationData: (cityData: CityDatatypes[]) => {
    // 대충 몽고디비에 저장하는 로직
    const newCityData: PopulationSchemaTypes[] = cityData.map(data => {
      return {
        ...data,
        populationMin: +data.populationMin,
        populationMax: +data.populationMax,
        populationTime: new Date(data.populationTime)
      };
    });
    populationRepository.saveMany(newCityData);
    return cityData;
  }
};
