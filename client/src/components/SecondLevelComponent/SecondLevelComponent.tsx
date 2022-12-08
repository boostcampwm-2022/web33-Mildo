import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useAtom } from 'jotai';

import {
  graphInfoResponseTypes,
  SortAllAreasTypes
} from '../../types/interfaces';
import {
  SecondLevelBox,
  TraceGraph,
  TomorrowRanking
} from './SecondLevelComponent.style';
import useGraphInfo from '../../hooks/useGraphInfo';
import { getGraphOptions, getSeries } from '../../utils/graph.util';
import { prevFirstLevelInfoAtom } from '../../atom/infoDetail';

interface SecondLevelComponentProps {
  isDisplay: boolean;
  firstLevelInfo: SortAllAreasTypes;
  isSecondLevel: boolean;
}

const SecondLevelComponent: React.FC<SecondLevelComponentProps> = ({
  isDisplay,
  firstLevelInfo,
  isSecondLevel
}) => {
  const [prevFirstLevelInfo, setPrevFirstLevelInfo] = useAtom(
    prevFirstLevelInfoAtom
  );
  const [options, setOptions] = useState<ApexOptions>();
  const [series, setSeries] = useState<ApexAxisChartSeries>([]);

  const success = (data: graphInfoResponseTypes | null) => {
    if (data) {
      setPrevFirstLevelInfo(firstLevelInfo);
    }
  };

  const [graphInfoResponse] = useGraphInfo(
    isSecondLevel,
    firstLevelInfo,
    prevFirstLevelInfo,
    success
  );

  // 그래프에 필요한 이전 시간 정보 호출
  const setPastInformation = async (): Promise<undefined> => {
    if (!firstLevelInfo) {
      return;
    }

    if (graphInfoResponse) {
      setPrevFirstLevelInfo(firstLevelInfo);
    }

    // eslint-disable-next-line no-useless-return
    return;
  };

  useEffect(() => {
    console.log(isSecondLevel);

    if (!isSecondLevel) {
      return;
    }

    setPastInformation();
  }, [isSecondLevel]);

  // graphInfo가 들어오면 loading을 false로 만들어줌
  useEffect(() => {
    if (!graphInfoResponse) {
      return;
    }

    setOptions(getGraphOptions(graphInfoResponse));
    setSeries(getSeries(graphInfoResponse));
  }, [graphInfoResponse]);

  return (
    <SecondLevelBox isDisplay={isDisplay}>
      <TraceGraph>
        {options && series && (
          <Chart
            type='bar'
            options={options}
            series={series}
            width='100%'
            height={2000}
          />
        )}
      </TraceGraph>
      <TomorrowRanking></TomorrowRanking>
    </SecondLevelBox>
  );
};

export default SecondLevelComponent;
