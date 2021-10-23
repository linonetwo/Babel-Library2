import React from 'react';
import styled from 'styled-components';
import Panel from '../../components/panel';
import Article from './article';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export default () => {
  return (
    <Container className="">
      <Panel />
      <Article />
    </Container>
  );
};
