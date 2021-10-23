import React, { useState } from 'react';
import styled from 'styled-components';
import Face from './assets/face.png';

const Container = styled.div`
  width: 150px;
  height: 220px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #c4c4c4;
  margin: 16px;

  .cover {
    width: 60px;
    height: 70px;
    object-fit: contain;
  }

  h1 {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: 800;
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
`;

export default () => {
  return (
    <Container>
      <img className="cover" src={Face} />
      <h1>书名</h1>
      <p>简短的简介，kkk，嗯嗯嗯</p>
    </Container>
  );
};
