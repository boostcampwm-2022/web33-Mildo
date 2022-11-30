import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

import { SecondLevelTimeInfoCacheTypes } from '../../types/interfaces';
import {
  SecondLevelBox,
  TraceGraph,
  TomorrowRanking
} from './SecondLevelComponent.style';
import { COLOR_PALETTE } from '../../config/constants';

interface SecondLevelComponentProps {
  isDisplay: boolean;
  graphInfo: SecondLevelTimeInfoCacheTypes;
}

const SecondLevelComponent: React.FC<SecondLevelComponentProps> = ({
  isDisplay,
  graphInfo
}) => {
  const getHourDiff = (date: string) => {
    const msDiff =
      new Date(Object.keys(graphInfo)[0]).getTime() - new Date(date).getTime();
    const hourDiff = msDiff / (1000 * 60 * 60);

    return hourDiff.toFixed(0);
  };

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
      categories: Object.keys(graphInfo)
        .slice(1)
        .map(item => `${getHourDiff(item)}시간 전`),
      labels: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: [],
          fontSize: '14px',
          fontWeight: 600
        },
        offsetX: 7,
        offsetY: 0
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
      data: Object.values(graphInfo)
        .slice(1)
        .map(item => item.populationMin)
    },
    {
      name: '최댓값',
      data: Object.values(graphInfo)
        .slice(1)
        .map(item => item.populationMax)
    }
  ];

  return (
    <SecondLevelBox isDisplay={isDisplay}>
      {isDisplay && (
        <TraceGraph>
          <Chart
            type='bar'
            options={options}
            series={series}
            width='100%'
            height={700}
          />
        </TraceGraph>
      )}
      <TomorrowRanking></TomorrowRanking>
    </SecondLevelBox>
  );
};

export default SecondLevelComponent;
