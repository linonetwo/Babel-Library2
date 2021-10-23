import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  padding: 20px;
  &,
  & * {
    font-family: unset;
    font-size: 14px;
  }
`;
const FriendLinkRow = styled.span`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  a {
    margin-right: 20px;
  }
`;
const Title = styled.h3``;

export function FriendLinks(): JSX.Element {
  return (
    <Container>
      <Title>感谢</Title>
      <FriendLinkRow>
        开发组：<a href="https://github.com/linonetwo">林一二</a> <a href="">李子申</a> <a href="https://github.com/Here21">张灏哲</a>
      </FriendLinkRow>
      <span>项目核心引擎：基于模板的「基于模板的文本自动生成器」自动生成器！（在本次Hackathon内开发！）</span>
      <FriendLinkRow>
        <a href="https://github.com/linonetwo/template-based-generator-template">Github Template</a>
        <a href="https://onetwo.ren/template-based-generator-template/">在线试玩</a>
      </FriendLinkRow>

      <span>我们使用了基于 CC BY-SA 3.0 协议的 CDDA 游戏知识图谱！在此希望更多人入坑！</span>
      <FriendLinkRow>
        <a href="cataclysmdda.org/">官网</a>
        <a href="https://github.com/CleverRaven/Cataclysm-DDA/releases/latest">官方Github</a>
        <a href="https://cdda.fun/">中文社区</a>
        <a href="https://github.com/linonetwo/CDDA-Kenan-Modpack-Chinese">社区图谱包</a>
      </FriendLinkRow>
    </Container>
  );
}
