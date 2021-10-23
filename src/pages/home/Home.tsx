import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { FriendLinks } from './FriendLinks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`;

function Home(): JSX.Element {
  return (
    <Container className="">
      <Button />
      <FriendLinks />
    </Container>
  );
}

export default Home;
