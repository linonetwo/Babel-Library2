import React from 'react';
import styled from 'styled-components';
import StarYellow from './assets/star_yellow.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .row {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
  }
  .row-inline {
    display: flex;
    align-items: center;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  .cover {
    height: 86px;
    width: 86px;
    background-color: #000;
  }

  .thumb {
    height: 25px;
    width: 25px;
  }
`;

export default () => {
  return (
    <Container>
      <div className="row">
        <img className="cover" src="" alt="" />
        <div className="column">
          <p>名称</p>
          <p>属性</p>
        </div>
      </div>
      <div className="row">物品背景历史等等等等物品 背景历史等等等等物品背景 历史等等等等</div>
      影响
      <div className="row-inline">
        <img className="thumb" src={StarYellow} alt="" />
        资源：
        <div className="row-inline">
          <img className="thumb" src={StarYellow} />
          <img className="thumb" src={StarYellow} />
          <img className="thumb" src={StarYellow} />
          <img className="thumb" src={StarYellow} />
          <img className="thumb" src={StarYellow} />
        </div>
      </div>
      <div className="row-inline">
        <img className="thumb" src={StarYellow} alt="" />
        威胁：
        <div className="row-inline">
          <img className="thumb" src={StarYellow} />
        </div>
      </div>
      <div className="row-inline">
        <img className="thumb" src={StarYellow} alt="" />
        智慧：
        <div className="row-inline">
          <img className="thumb" src={StarYellow} />
          <img className="thumb" src={StarYellow} />
          <img className="thumb" src={StarYellow} />
        </div>
      </div>
    </Container>
  );
};
