import { ApexOptions } from 'apexcharts';
import { COLOR_PALETTE } from '../config/constants';
import { SecondLevelTimeInfoCacheTypes } from '../types/interfaces';
import { makeTime } from './time.util';

interface SecondLevelTimeInfoResponseTypes {
  ok: boolean;
  data: SecondLevelTimeInfoCacheTypes;
}

// eslint-disable-next-line import/prefer-default-export
export const getGraphOptions = (
  graphInfoResponse: SecondLevelTimeInfoResponseTypes
): ApexOptions => {
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

  return options;
};

export const getSeries = (
  graphInfoResponse: SecondLevelTimeInfoResponseTypes
): ApexAxisChartSeries => {
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

  return series;
};
