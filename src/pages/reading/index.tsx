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
`;

export default () => {
  const history = useHistory();
  const currentTemplate = useSelector((state: RootState) => state.bookState.currentDetailedReadTemplate);
  const content = useSelector((state: RootState) => state.bookState.currentDetailedReadContent);
  console.log('currentTemplate', currentTemplate);
  console.log('content', content);

  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    setTimeout(() => {
      dispatch.valueState.updateScore('resource', 1);
    }, 1000);
    setTimeout(() => {
      dispatch.valueState.updateScore('menace', 1);
    }, 2000);
    setTimeout(() => {
      dispatch.valueState.updateScore('culture', 1);
    }, 3000);
    setTimeout(() => {
      console.log('新道具');
      dispatch.valueState.insertInventory('烂梗王');
    }, 2000);

    // 退出 mock
    // history.replace('/main');
  }, []);

  const [active, setActive] = useState(false);
  const onClose = () => {
    setActive(!active);
  };
  return (
    <Container>
      <Panel />
      <button onClick={onClose}>open</button>
      <Dialog active={active} onClose={onClose}>
        <Material />
      </Dialog>
      <Content>
        <Article />
      </Content>
    </Container>
  );
};
