import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, RootState } from 'src/store/store';

import ResCell from './ResCell';

const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px;
  width: 100%;
  background-color: #c4c4c4;
`;

export default () => {
  const scores = useSelector((state: RootState) => state.valueState.scores);
  let history = useHistory();
  const handleClick = () => {
    history.push('/guide');
  };
  return (
    <Panel onClick={handleClick}>
      <ResCell name="资源" value={scores.resource} />
      <ResCell name="威胁" value={scores.menace} />
      <ResCell name="文明" value={scores.culture} />
    </Panel>
  );
};
