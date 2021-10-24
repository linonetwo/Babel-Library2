import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, RootState } from 'src/store/store';

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

const Item = styled.div`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #4f4f4f;
  color: white;
`;

export function InventoryBar(): JSX.Element {
  const inventory = useSelector((state: RootState) => state.valueState.inventory);
  const dispatch = useDispatch<Dispatch>();
  // DEBUG: console
  console.log(`inventory`, inventory);
  return (
    <Container>
      {inventory.map((item) => (
        <Cell key={item} onClick={() => dispatch.uiState.inspectItem(item)}>
          <Item>{item[0]}</Item>
        </Cell>
      ))}
    </Container>
  );
}
