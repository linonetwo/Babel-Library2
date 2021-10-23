import React, { useState } from 'react';
import styled from 'styled-components';
import Face from './assets/face.png';

const Container = styled.div`
  width: 100%;
  padding: 25px;
  max-height: 350px;
  text-align: right;

  .avatar {
    height: 55px;
    width: 55px;
    object-fit: contain;
    border-radius: 50%;
    background-color: #e6bd09;
  }
`;

export default () => {
  return (
    <Container>
      <section className="message -right">
        <div className="nes-balloon from-right">
          <p>点击引导者头像进入探索进程。</p>
        </div>
      </section>
      <img className="avatar" src={Face} />
    </Container>
  );
};
