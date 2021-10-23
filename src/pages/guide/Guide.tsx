import React from 'react';
import styled from 'styled-components';
import Guider from './assets/guide-man.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

function Guide() {
  return (
    <Container className="">
      <img src={Guider} />
    </Container>
  );
}

export default Guide;
