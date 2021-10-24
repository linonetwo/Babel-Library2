import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';

import ResultCell from './ResultCell';

const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px;
  width: 100%;
  background-color: #c4c4c4;
`;

export default function ScorePanel(): JSX.Element {
  const scores = useSelector((state: RootState) => state.valueState.scores);
  return (
    <Panel>
      {Object.keys(scores).map((key: string) => (
        <ResultCell name={key} key={key} value={scores[key]} />
      ))}
    </Panel>
  );
}
