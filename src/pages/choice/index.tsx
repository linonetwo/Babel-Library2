import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Speaker from '../../components/speaker';
import Book from '../../components/book';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  .bookList {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
`;

export default (): JSX.Element => {
  return (
    <Container>
      <div className="bookList">
        <Book />
        <Book />
        <Book />
      </div>
      <Speaker />
    </Container>
  );
};
