import React from 'react';
import styled from 'styled-components';
import Panel from '../../components/panel';
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
  return (
    <Container>
      <Panel />
      <Content>
        <Article />
      </Content>
    </Container>
  );
};
