import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, Dispatch } from 'src/store/store';
import styled from 'styled-components';
import Guider from './assets/guide-man.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const GuiderImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ScrollBox = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  margin-bottom: 200px;
`;

interface MessageBoxProps {
  left?: boolean;
}

const MessageBox = styled.div<MessageBoxProps>`
  width: 315px;
  background-color: #c4c4c4;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.left ? 'flex-start' : 'flex-end')};
`;

export function GuiderText(props: { guideText: string[]; linkTo: string }): JSX.Element {
  return (
    <Container className="nes-container">
      <ScrollBox className="message-list">
        {props.guideText.map((text, index) => (
          <section className={`message ${index % 2 === 0 ? '-left' : '-right'}`}>
            <div className={`nes-balloon from${index % 2 === 0 ? '-left' : '-right'}`}>
              <p>{text}</p>
            </div>
          </section>
        ))}
      </ScrollBox>
      <Link to={props.linkTo}>
        <GuiderImage src={Guider} />
      </Link>
    </Container>
  );
}

export function Guide(): JSX.Element {
  const guideText = useSelector((state: RootState) => state.uiState.guideText);
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.uiState.loadGuideText({});
    dispatch.valueState.loadItemDefinitions({});
    dispatch.bookState.updateDetailedReadRound();
    dispatch.valueState.loadEndingDefinitions({});
  }, []);
  return <GuiderText guideText={guideText} linkTo="/main" />;
}

export function End(): JSX.Element {
  const currentEnding = useSelector((state: RootState) => state.valueState.currentEnding);
  const history = useHistory();
  return currentEnding !== undefined ? (
    <GuiderText guideText={[currentEnding.name, currentEnding.description]} linkTo="/" />
  ) : (
    <GuiderText guideText={['游戏结束，结局计算出了Bug，兜底已试行但未生效…']} linkTo="/" />
  );
}
