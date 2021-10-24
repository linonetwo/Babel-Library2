import React, { useEffect } from 'react';
import styled from 'styled-components';

import { IBookTextMetadata } from 'src/store/models/bookState';
import { IOutputWIthMetadata } from 'tbg';

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  margin: 0 auto;
`;

interface ArticleProps {
  content: any;
  nextPage: () => void;
}

export default ({ content, nextPage }: ArticleProps) => {
  useEffect(() => {
    // 更新积分
  }, [content]);
  return (
    <Article className="nes-container is-dark is-rounded" onClick={nextPage}>
      <p>{content.value}</p>
    </Article>
  );
};
