import { useQuery } from 'react-query';
import apis from '../apis/apis';
import { QUERY_TIME } from '../config/constants';
import { SortAllAreasTypes, graphInfoResponseTypes } from '../types/interfaces';

const useGraphInfo = (
  enabled: boolean,
  firstLevelInfo: SortAllAreasTypes | null,
  success: (data: graphInfoResponseTypes | null) => void
) => {
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
      enabled,
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
