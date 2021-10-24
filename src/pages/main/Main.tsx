import styled from 'styled-components';
import { ScorePanel } from '../../components/score';
import { SkimThroughReadChat } from './chat';
import { InventoryBar } from '../../components/inventory';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export function Main(): JSX.Element {
  return (
    <Container>
      <ScorePanel />
      <SkimThroughReadChat />
      <InventoryBar />
    </Container>
  );
}
