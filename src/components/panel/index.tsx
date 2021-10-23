import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import ResCell from './ResCell';

const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px;
  width: 100%;
  background-color: #c4c4c4;
`;

export default () => {
  let history = useHistory();
  const handleClick = () => {
    history.push('/guide');
  };
  return (
    <Panel onClick={handleClick}>
      <ResCell />
      <ResCell />
      <ResCell />
    </Panel>
  );
};
