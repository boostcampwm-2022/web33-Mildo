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
  console.log(graphInfo);

  return (
    <SecondLevelBox isDisplay={isDisplay}>
      <TraceGraph></TraceGraph>
      <TomorrowRanking></TomorrowRanking>
    </SecondLevelBox>
  );
};

export default SecondLevelComponent;
