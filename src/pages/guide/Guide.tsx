import { useEffect } from 'react';
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

const ScrollBox = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  overflow: scroll;
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

export function Guide(): JSX.Element {
  const guideText = useSelector((state: RootState) => state.uiState.guideText);
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.uiState.loadGuideText({});
  }, []);
  return (
    <Container className="nes-container">
      <section className="message-list">
        {guideText.map((text, index) => (
          <section className={`message ${index % 2 === 0 ? '-left' : '-right'}`}>
            <div className={`nes-balloon from${index % 2 === 0 ? '-left' : '-right'}`}>
              <p>{text}</p>
            </div>
          </section>
        ))}
      </section>
      <Link to="/main">
        <GuiderImage src={Guider} />
      </Link>
    </Container>
  );
}
