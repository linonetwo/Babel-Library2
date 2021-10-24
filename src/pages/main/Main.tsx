import React from 'react';
import styled from 'styled-components';
import Panel from '../../components/score';
import { SkimThroughReadChat } from './chat';
import StuffBar from '../../components/stuff';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export function Main(): JSX.Element {
  return (
    <Container>
      <Panel />
      <SkimThroughReadChat />
      <StuffBar />
    </Container>
  );
}
