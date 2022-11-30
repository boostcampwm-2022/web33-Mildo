import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

import { SecondLevelTimeInfoCacheTypes } from '../../types/interfaces';
import {
  SecondLevelBox,
  TraceGraph,
  TomorrowRanking
} from './SecondLevelComponent.style';

interface SecondLevelComponentProps {
  isDisplay: boolean;
  graphInfo: SecondLevelTimeInfoCacheTypes;
}

const SecondLevelComponent: React.FC<SecondLevelComponentProps> = ({
  isDisplay,
  graphInfo
}) => {
  // useEffect(() => {

  // }, [graphInfo])

  const getHourDiff = (date: string) => {
    const msDiff =
      new Date(Object.keys(graphInfo)[0]).getTime() - new Date(date).getTime();
    const hourDiff = msDiff / (1000 * 60 * 60);

    return Number.isInteger(hourDiff) ? hourDiff : hourDiff.toFixed(1);
  };

  const options: ApexOptions = {
    chart: {
      width: '5000',
      height: '5000',
      zoom: {
        enabled: true
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
        .map(item => `${getHourDiff(item)}시간 전`)
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
      <TraceGraph>
        <Chart type='bar' options={options} series={series} />
      </TraceGraph>
      <TomorrowRanking></TomorrowRanking>
    </SecondLevelBox>
  );
};

export default SecondLevelComponent;
