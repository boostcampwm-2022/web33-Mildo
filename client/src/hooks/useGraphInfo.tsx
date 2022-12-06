import { useQuery } from 'react-query';
import apis from '../apis/apis';
import { QUERY_TIME } from '../config/constants';
import { SortAllAreasTypes, graphInfoResponseTypes } from '../types/interfaces';

const useGraphInfo = (
  isSecondLevel: boolean,
  firstLevelInfo: SortAllAreasTypes | null,
  prevFirstLevelInfo: SortAllAreasTypes | null,
  success: (data: graphInfoResponseTypes | null) => void
) => {
  const enabled = () => {
    if (!isSecondLevel) {
      return false;
    }
    if (!firstLevelInfo || !prevFirstLevelInfo) {
      return true;
    }
    if (prevFirstLevelInfo[0] === firstLevelInfo[0]) {
      return false;
    }
    return true;
  };

  const { data: graphInfoResponse } = useQuery(
    ['getGraphInfo', firstLevelInfo ? firstLevelInfo[0] : ''],
    async () => {
      if (!firstLevelInfo) {
        return null;
      }
      const result = await apis.getPastInformation(firstLevelInfo[0]);

      return result;
    },
    {
      enabled: enabled(),
      staleTime: QUERY_TIME.STALE_TIME,
      cacheTime: QUERY_TIME.CACHE_TIME,
      onSuccess: data => {
        success(data);
      },
      onError: e => {
        console.log('error', e);
      }
    }
  );

  return [graphInfoResponse];
};

export default useGraphInfo;
