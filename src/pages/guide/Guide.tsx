import { Link } from 'react-router-dom';
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
  return (
    <Container className="nes-container">
      <section className="message-list">
        <section className="message -left">
          <div className="nes-balloon from-left">
            <p>// 玩法介绍</p>
          </div>
        </section>

        <section className="message -right">
          <div className="nes-balloon from-right">
            <p>// 讲一下游戏故事背景，关键信息等，游戏达成条件等</p>
            <p>点击引导者头像进入探索进程。</p>
          </div>
        </section>
      </section>
      <Link to="/main">
        <GuiderImage src={Guider} />
      </Link>
    </Container>
  );
}
