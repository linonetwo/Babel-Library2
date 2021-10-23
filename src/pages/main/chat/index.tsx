import React from 'react';
import styled from 'styled-components';
import avatar1 from '../assets/avatar-1.png';

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

const Avatar = styled.img`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
`;

export default () => {
  return (
    <SectionList className="message-list">
      <Message className="message -left">
        <Balloon className="nes-balloon from-left">
          <BalloonContent direction="left">
            <p>废话废话废话废话，废话废话废话废话废话废话废话废话废话废话废话废话，废话废话废话废话</p>
            <Avatar src={avatar1} />
          </BalloonContent>
        </Balloon>
      </Message>
      <Message className="message -right">
        <Balloon className="nes-balloon from-right">
          <BalloonContent direction="right">
            <p>内容内容内容，内容内容内容内容内容内容内容内容内容，内容内容内容内容内容内容</p>
            <Avatar src={avatar1} />
          </BalloonContent>
        </Balloon>
      </Message>
    </SectionList>
  );
};
