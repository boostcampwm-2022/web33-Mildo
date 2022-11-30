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
  // const graphOptionsRef = useRef(null);
  // useEffect(() => {

  // }, [graphInfo])
  console.log(graphInfo);

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
    }
  };

  const series = [
    {
      name: '최솟값',
      data: Object.values(graphInfo).map(item => item.populationMin)
    },
    {
      name: '최댓값',
      data: Object.values(graphInfo).map(item => item.populationMax)
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
