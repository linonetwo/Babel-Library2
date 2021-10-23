import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

export function Home(): JSX.Element {
  return (
    <Container>
      <Button />
      <Link to="/reading">
        <h1>阅读界面</h1>
      </Link>
      <FriendLinks />
    </Container>
  );
}
