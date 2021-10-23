import React from 'react';
import styled from 'styled-components';

const ResCell = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 90px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
  object-fit: contain;
  background-color: #4f4f4f;
`;

const Text = styled.span`
  display: block;
  font-size: 20px;
`;

const ResProgress = styled.progress`
  height: 18px;
  margin: 0;
`;

export default () => {
  return (
    <ResCell>
      <Row>
        <Icon />
        <Text>资源</Text>
      </Row>
      <ResProgress className="nes-progress" value="90" max="100"></ResProgress>
    </ResCell>
  );
};
