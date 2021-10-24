import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import type { IOutputWIthMetadata } from 'tbg';
import type { IBookTextMetadata, IBookTextNewItemMetadata, IBookTextUpdateGameScoreMetadata } from 'src/store/models/bookState';
import { Dispatch } from 'src/store/store';

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  margin: 0 auto;
`;

interface ArticleProps {
  content: IOutputWIthMetadata<IBookTextMetadata[]>;
  nextPage: () => void;
}

export default ({ content, nextPage }: ArticleProps) => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    const scoreUpdatePayload = content.metadata?.[0];
    // DEBUG: console
    console.log(`scoreUpdatePayload`, scoreUpdatePayload);
    if (scoreUpdatePayload !== undefined) {
      const { score, scoreDiff } = scoreUpdatePayload as IBookTextUpdateGameScoreMetadata;
      if (score && scoreDiff) {
        const realValue = dispatch.valueState.checkItemAffectValues({ score, scoreDiff });
        // DEBUG: console
        console.log(`realValue`, realValue);
        dispatch.valueState.updateScore(realValue.score, realValue.scoreDiff);
      }
      const { item } = scoreUpdatePayload as IBookTextNewItemMetadata;
      if (item) {
        dispatch.valueState.insertInventory(item);
      }
    }
  }, [content]);
  return (
    <Article className="nes-container is-dark is-rounded" onClick={nextPage}>
      <p>{content.value}</p>
    </Article>
  );
};
