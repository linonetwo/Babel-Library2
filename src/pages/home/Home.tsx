import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FriendLinks } from './FriendLinks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Button = styled.button``;

export function Home(): JSX.Element {
  return (
    <Container>
      <Link to="/guide">
        <Button className="nes-btn is-primary">开始探索</Button>
      </Link>
      <FriendLinks />
    </Container>
  );
}
