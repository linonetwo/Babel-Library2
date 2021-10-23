import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px;
  width: 100%;
  background-color: #c4c4c4;
  flex-wrap: wrap;
`;

const Cell = styled.div`
  height: 62px;
  width: 62px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #4f4f4f;
`;

export default () => {
  let history = useHistory();
  const handleClick = () => {
    history.push('/guide');
  };
  return (
    <Container onClick={handleClick}>
      <Cell>
        <Item />
      </Cell>
      <Cell>
        <Item />
      </Cell>
      <Cell>
        <Item />
      </Cell>
      <Cell>
        <Item />
      </Cell>
      <Cell>
        <Item />
      </Cell>
      <Cell>
        <Item />
      </Cell>
      <Cell>
        <Item />
      </Cell>
      <Cell>
        <Item />
      </Cell>
    </Container>
  );
};
