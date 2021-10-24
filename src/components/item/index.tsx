import React from 'react';
import { IItem } from 'src/store/models/valueState';
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

const Thumb = styled.img<{ minus?: boolean }>`
  ${({ minus }) => minus === true && `background-color: black;`}
`;

export function ItemDescription(props: { item: IItem }): JSX.Element {
  const { id, description, effects } = props.item;
  return (
    <Container>
      <div className="row">
        <img className="cover" src="" alt="" />
        <div className="column">
          <p>名称</p>
          <p>{id}</p>
        </div>
      </div>
      <div className="row">{description}</div>
      影响
      {effects.map((effect) => (
        <>
          {effect.effectTo !== undefined && (
            <div className="row-inline">
              {effect.effectTo}
              <div className="row-inline">
                {Array.from({ length: effect.value }).map((_, index) => (
                  <Thumb key={index} className="thumb" src={StarYellow} />
                ))}
                {effect.value < 0 && <Thumb minus className="thumb" src={StarYellow} />}
              </div>
            </div>
          )}
          {effect.effectFrom !== undefined && (
            <div className="row-inline">
              {effect.effectFrom}
              <div className="row-inline">
                <Thumb minus className="thumb" src={StarYellow} />
              </div>
            </div>
          )}
        </>
      ))}
    </Container>
  );
}
