import React, { useState } from 'react';
import styled from 'styled-components';
import Panel from '../../components/panel';
import Dialog from '../../components/dialog';
import Material from '../../components/material';
import Article from './article';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export default () => {
  const [active, setActive] = useState(false);
  const onClose = () => {
    setActive(!active);
  };
  return (
    <Container>
      <Panel />
      <button onClick={onClose}>open</button>
      <Dialog active={active} onClose={onClose}>
        <Material />
      </Dialog>
      <Content>
        <Article />
      </Content>
    </Container>
  );
};
