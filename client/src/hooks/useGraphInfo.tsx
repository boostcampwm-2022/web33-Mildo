import axios from 'axios';
import { useQuery } from 'react-query';
import {
  SecondLevelTimeInfoCacheTypes,
  SortAllAreasTypes,
  graphInfoResponseTypes
} from '../types/interfaces';

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
      const result = await axios.get<{
        ok: boolean;
        data: SecondLevelTimeInfoCacheTypes;
      }>(`http://localhost:3001/api/seoul/${firstLevelInfo[0]}`);

      return result.data;
    },
    {
      enabled,
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
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
