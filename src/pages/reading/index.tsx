import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, RootState } from 'src/store/store';
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
  overflow: scroll;
`;

export default function DetailedReading(): JSX.Element {
  const history = useHistory();
  const content = useSelector((state: RootState) => state.bookState.currentDetailedReadContent);

  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(0);
  }, [content]);

  const [active, setActive] = useState(false);
  const onClose = (): void => {
    setActive(!active);
  };

  const onNextPage = (): void => {
    if (page < content.length - 1) {
      setPage(page + 1);
    } else {
      // end reading
      history.replace('/main');
    }
  };
  return (
    <Container>
      <Panel />
      <button onClick={onClose}>open</button>
      <Dialog active={active} onClose={onClose}>
        <Material />
      </Dialog>
      <Content>{content[page] !== undefined && <Article content={content[page]} nextPage={onNextPage} />}</Content>
    </Container>
  );
}
