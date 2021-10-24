import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, RootState } from 'src/store/store';
import Panel from '../../components/score';
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
  const detailedReadRound = useSelector((state: RootState) => state.bookState.detailedReadRound);
  const currentDetailedReadRound = useSelector((state: RootState) => state.bookState.currentDetailedReadRound);
  const dispatch = useDispatch<Dispatch>();

  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(0);
  }, [content]);

  const [active, setActive] = useState(false);
  const onClose = (): void => {
    setActive(!active);
  };

  const onNextPage = useCallback((): void => {
    if (page < content.length - 1) {
      setPage(page + 1);
    } else {
      // end reading
      // 判断是不是已经读够了
      if (currentDetailedReadRound >= detailedReadRound) {
        // 是的话就进入结束界面
      } else {
        // 否则就继续读
        dispatch.bookState.updateCurrentDetailedReadRound(currentDetailedReadRound + 1);
        // 跳回略读界面
        history.replace('/main');
      }
    }
  }, [currentDetailedReadRound, detailedReadRound]);
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
