import React from 'react';
import styled from 'styled-components';

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  margin: 0 auto;
`;

export default () => {
  return (
    <Article className="nes-container is-dark is-rounded">
      <p className="title">小标题</p>
      <p>小说是文学的一种样式，一般描写人物故事，塑造多种多样的人物形象，但亦有例外。 Good morning. Thou hast had a good night's sleep, I hope.</p>
    </Article>
  );
};
