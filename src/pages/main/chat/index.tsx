import { dropRight, takeRight } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Dispatch, RootState } from 'src/store/store';
import avatar1 from '../assets/avatar-1.png';
import robotAvatar from '../assets/robot.svg';

const SectionList = styled.section`
  padding: 16px;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

const Message = styled.section`
  display: flex;
`;

const Balloon = styled.div`
  flex: 1;
`;

interface BalloonContentProps {
  direction: 'left' | 'right';
}

const BalloonContent = styled.div<BalloonContentProps>`
  flex: 1;
  text-align: ${(props) => props.direction};
`;

const Avatar = styled.img<{ mirror?: boolean }>`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  ${({ mirror }) => mirror && `transform: rotateY(180deg);`}
`;

function ChatLeft(props: { message: string }) {
  return (
    <Message className="message -left">
      <Balloon className="nes-balloon from-left">
        <BalloonContent direction="left">
          <p>这本书里面提到{props.message}</p>
          <Avatar src={robotAvatar} />
        </BalloonContent>
      </Balloon>
    </Message>
  );
}
function ChatRight(props: { message: string }) {
  return (
    <Message className="message -right">
      <Balloon className="nes-balloon from-right">
        <BalloonContent direction="right">
          <p>我对它写的{props.message}没什么兴趣</p>
          <Avatar src={avatar1} mirror />
        </BalloonContent>
      </Balloon>
    </Message>
  );
}

export function SkimThroughReadChat(): JSX.Element {
  const currentSkimThroughReadContent = useSelector((state: RootState) => state.bookState.currentSkimThroughReadContent);
  const skimThroughReadInterval = useSelector((state: RootState) => state.bookState.skimThroughReadInterval);
  const [currentSkimThroughChat, currentSkimThroughChatSetter] = useState<string[]>([]);
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.bookState.startNewSkimThroughRead({});
  }, []);

  const scrollBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const oldContents = dropRight(currentSkimThroughReadContent);
    const newContent = takeRight(currentSkimThroughReadContent);
    let nextSkimThroughChat: string[] = [];
    if (currentSkimThroughReadContent.length > 1) {
      nextSkimThroughChat = [...oldContents.flatMap((object) => [object.description, object.name]), newContent[0].description];
    } else if (currentSkimThroughReadContent.length === 1) {
      nextSkimThroughChat = currentSkimThroughReadContent.flatMap((object) => [object.description]);
    } else {
      return;
    }

    currentSkimThroughChatSetter(nextSkimThroughChat);

    const timeoutHandle = setTimeout(() => {
      let nextSkimThroughChat2: string[] = [];
      if (currentSkimThroughReadContent.length >= 1) {
        nextSkimThroughChat2 = [...nextSkimThroughChat, newContent[0].name];
      } else {
        return;
      }
      currentSkimThroughChatSetter(nextSkimThroughChat2);
    }, skimThroughReadInterval / 2);
    return () => clearTimeout(timeoutHandle);
  }, [currentSkimThroughReadContent]);

  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  });

  return (
    <SectionList className="message-list">
      {currentSkimThroughChat.map((bookDescription, index) =>
        index % 2 === 0 ? <ChatLeft message={bookDescription} /> : <ChatRight message={bookDescription} />,
      )}
      <div id="section-scroll-bottom-anchor" ref={scrollBottomRef} />
    </SectionList>
  );
}
