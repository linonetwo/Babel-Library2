import styled from 'styled-components';
import { Tooltip2 } from '@blueprintjs/popover2';
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
  return (
    <Container>
      {inventory.map((item) => (
        <Cell key={item} onClick={() => dispatch.uiState.inspectItem(item)}>
          <Tooltip2 content={`查看${item}`}>
            <Item>{item[0]}</Item>
          </Tooltip2>
        </Cell>
      ))}
    </Container>
  );
}
