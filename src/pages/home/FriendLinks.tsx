import styled from 'styled-components';

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
  justify-content: space-between;
  a {
    margin-right: 20px;
  }
`;
const Title = styled.h3``;
const Name = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function FriendLinks(): JSX.Element {
  return (
    <Container>
      <Title>感谢</Title>
      <span>开发组：</span>
      <FriendLinkRow>
        <Name>
          主催 / AI
          <a target="_blank" href="https://github.com/linonetwo" rel="noreferrer">
            林一二
          </a>
        </Name>
        <Name>
          文案 / 策划
          <a target="_blank" href="">
            李子申
          </a>
        </Name>
        <Name>
          UI设计 / 前端
          <a target="_blank" href="https://github.com/Here21" rel="noreferrer">
            张灏哲
          </a>
        </Name>
      </FriendLinkRow>
      <span>项目核心引擎：基于模板的「基于模板的文本自动生成器」自动生成器！（在本次Hackathon内开发！）</span>
      <FriendLinkRow>
        <a target="_blank" href="https://github.com/linonetwo/template-based-generator-template" rel="noreferrer">
          Github Template
        </a>
        <a target="_blank" href="https://onetwo.ren/template-based-generator-template/" rel="noreferrer">
          在线试玩
        </a>
      </FriendLinkRow>

      <span>我们使用了基于 CC BY-SA 3.0 协议的 CDDA 游戏知识图谱！在此希望更多人入坑！</span>
      <FriendLinkRow>
        <a target="_blank" href="cataclysmdda.org/">
          官网
        </a>
        <a target="_blank" href="https://github.com/CleverRaven/Cataclysm-DDA/releases/latest" rel="noreferrer">
          官方Github
        </a>
        <a target="_blank" href="https://cdda.fun/" rel="noreferrer">
          中文社区
        </a>
        <a target="_blank" href="https://github.com/linonetwo/CDDA-Kenan-Modpack-Chinese" rel="noreferrer">
          社区图谱包
        </a>
      </FriendLinkRow>
    </Container>
  );
}
