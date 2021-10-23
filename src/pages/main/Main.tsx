import React from 'react';
import styled from 'styled-components';
import Panel from './panel';
import Chat from './chat';
import StuffBar from './stuff';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

function Main() {
  return (
    <Container className="">
      <Panel />
      <Chat />
      <StuffBar />
    </Container>
  );
}

export default Main;