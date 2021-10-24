import React from 'react';
import styled from 'styled-components';

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  margin: 0 auto;
`;

export default (props: { content: string }) => {
  return (
    <Article className="nes-container is-dark is-rounded">
      <p>{props.content}</p>
    </Article>
  );
};
