import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, RootState } from 'src/store/store';
import styled from 'styled-components';
import { DetailedReadingGuide } from '../../components/speaker';
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
  const history = useHistory();
  const books = useSelector((state: RootState) => state.bookState.currentDetailedTemplateNames);

  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.bookState.loadAvailableDetailedTemplates(3);
  }, []);

  const onChooseBook = async (name: string) => {
    await dispatch.bookState.startNewDetailedRead(name);
    history.push('/reading');
  };

  return (
    <Container>
      <div className="bookList">
        {books.map((book) => (
          <Book key={book} name={book} onChoose={onChooseBook} />
        ))}
      </div>
      <DetailedReadingGuide />
    </Container>
  );
};
