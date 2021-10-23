import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

function Main() {
  return (
    <Container className="">
      <Button />
    </Container>
  );
}

export default Main;
