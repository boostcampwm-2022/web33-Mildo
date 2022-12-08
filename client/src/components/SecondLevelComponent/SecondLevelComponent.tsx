import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useAtom } from 'jotai';

import {
  graphInfoResponseTypes,
  // SecondLevelTimeInfoCacheTypes,
  SortAllAreasTypes
} from '../../types/interfaces';
import {
  SecondLevelBox,
  TraceGraph,
  TomorrowRanking
} from './SecondLevelComponent.style';
import { COLOR_PALETTE } from '../../config/constants';
import MapLoading from '../MapLoading/MapLoading';
import { makeTime } from '../../utils/time.util';
import useGraphInfo from '../../hooks/useGraphInfo';
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
  const [isGraphLoading, setIsGraphLoading] = useState<boolean>(true);
  const [prevFirstLevelInfo, setPrevFirstLevelInfo] = useAtom(
    prevFirstLevelInfoAtom
  );

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
    if (Object.keys(graphInfoResponse.data).length !== 0) {
      setIsGraphLoading(false);
    }
  }, [graphInfoResponse]);

  // isSecondLevel이 false가 되면 setIsGraphLoading를 true로 바꿈
  useEffect(() => {
    if (!isDisplay) {
      setIsGraphLoading(true);
    }
  }, [isDisplay]);

  const options: ApexOptions = {
    chart: {
      zoom: {
        enabled: true
      },
      toolbar: {
        tools: {
          download: false
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: graphInfoResponse
        ? Object.keys(graphInfoResponse.data)
            .slice(1)
            .map(item => `${makeTime(item, 1)}`.split(' '))
        : [],
      labels: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '14px',
          fontWeight: 600
        },
        offsetX: 4,
        offsetY: 8
      }
    },
    colors: [`#9F8FFF`, `${COLOR_PALETTE.PRIMARY}`],
    stroke: {
      show: true,
      width: 0.5,
      colors: [`${COLOR_PALETTE.GREY20}`]
    },
    dataLabels: {
      enabled: true,
      offsetX: 6,
      style: {
        fontSize: '12px',
        colors: [`${COLOR_PALETTE.WHITE}`]
      },
      formatter: value => value.toLocaleString()
    },
    grid: {
      show: false,
      padding: {
        top: -30,
        left: 0,
        bottom: -20,
        right: 5
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    tooltip: {
      x: {
        show: false
      }
    }
  };

  const series = [
    {
      name: '최솟값',
      data: graphInfoResponse
        ? Object.values(graphInfoResponse.data)
            .slice(1)
            .map(item => item.populationMin)
        : []
    },
    {
      name: '최댓값',
      data: graphInfoResponse
        ? Object.values(graphInfoResponse.data)
            .slice(1)
            .map(item => item.populationMax)
        : []
    }
  ];

  return (
    <SecondLevelBox isDisplay={isDisplay}>
      {isDisplay && (
        <TraceGraph>
          {isGraphLoading ? (
            <MapLoading message={null} width='50px' height='50px' />
          ) : (
            <Chart
              type='bar'
              options={options}
              series={series}
              width='100%'
              height={2000}
            />
          )}
        </TraceGraph>
      )}
      <TomorrowRanking></TomorrowRanking>
    </SecondLevelBox>
  );
};

export default SecondLevelComponent;
