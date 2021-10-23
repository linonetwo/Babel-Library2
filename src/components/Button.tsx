import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button``;

export default () => {
  let history = useHistory();
  const handleClick = () => {
    history.push('/guide');
  };
  return (
    <Button className="nes-btn is-primary" onClick={handleClick}>
      开始游戏
    </Button>
  );
};
