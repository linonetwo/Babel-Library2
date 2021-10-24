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

export function DetailedReadingGuide(): JSX.Element {
  return (
    <Container>
      <section className="message -right">
        <div className="nes-balloon from-right">
          <p>选择一本书仔细研读。</p>
        </div>
      </section>
      <img className="avatar" src={Face} />
    </Container>
  );
}
