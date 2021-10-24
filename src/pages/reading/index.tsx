import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, RootState } from 'src/store/store';
import { ScorePanel } from '../../components/score';
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
  const [detailedReadEnd, detailedReadEndSetter] = useState<boolean>(false);

  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(0);
  }, [content]);

  const onNextPage = useCallback((): void => {
    if (page < content.length - 1) {
      setPage(page + 1);
    } else {
      // end reading
      // 判断是不是已经读够了
      if (currentDetailedReadRound >= detailedReadRound) {
        // 是的话就进入结束界面
      } else {
        // 否则就继续读，先展示当前阅读结论
        detailedReadEndSetter(true);
      }
    }
  }, [currentDetailedReadRound, detailedReadRound, page, setPage, detailedReadEndSetter]);
  const readEndText = content
    .flatMap((line) =>
      (line.metadata ?? []).map((metadata) => {
        let text = '';
        if ('item' in metadata) {
          text += `获得了「${metadata.item}」。`;
        }
        if ('score' in metadata) {
          text += `「${metadata.score}」得重新评估了。`;
        }
        return text;
      }),
    )
    .join('\n');
  return (
    <Container>
      <ScorePanel />
      {detailedReadEnd ? (
        <Content>
          {content[page] !== undefined && (
            <Article
              content={{ value: readEndText, metadata: [] }}
              nextPage={() => {
                // 跳回略读界面
                dispatch.bookState.updateCurrentDetailedReadRound(currentDetailedReadRound + 1);
                history.replace('/main');
              }}
            />
          )}
        </Content>
      ) : (
        <Content>{content[page] !== undefined && <Article content={content[page]} nextPage={onNextPage} />}</Content>
      )}
    </Container>
  );
}
