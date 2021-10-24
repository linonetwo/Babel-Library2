import React, { useState } from 'react';
import styled from 'styled-components';

interface MaskProps {
  active: boolean;
}

interface DialogProps {
  active: boolean;
  onClose: () => void;
  children?: JSX.Element;
}

const Dialog = styled.dialog`
  z-index: 100;
  margin: 20px;
  max-height: 650px;
  width: 350px;
  ::backdrop {
    background: rgba(0, 0, 0, 0.25);
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100%;
  max-height: 480px;
  margin-bottom: 16px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Mask = styled.div<MaskProps>`
  display: ${(props) => (props.active ? 'flex' : 'none')};
  overflow: hidden;
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  align-items: center;
  justify-content: center;
`;

export default ({ active = false, onClose, children }: DialogProps) => {
  const onClick = (event: any) => {
    event.stopPropagation();
    onClose();
  };
  return (
    <Mask active={active} onClick={onClick}>
      <Dialog open={active} className="nes-dialog is-rounded" onClick={(e) => e.stopPropagation()}>
        <Content>
          <Body>{children}</Body>
          <Menu className="dialog-menu">
            <button className="nes-btn" onClick={onClick}>
              关闭
            </button>
            <button className="nes-btn is-primary" onClick={onClick}>
              确认
            </button>
          </Menu>
        </Content>
      </Dialog>
    </Mask>
  );
};
