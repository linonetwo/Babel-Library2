import styled from 'styled-components';

const ResultCell = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 90px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
  object-fit: contain;
  background-color: #4f4f4f;
`;

const Text = styled.span`
  display: block;
  font-size: 20px;
`;

const ResultProgress = styled.progress`
  height: 18px;
  margin: 0;
`;

interface ResultCellProps {
  name: string;
  value: number;
}

export default function functionResultCell({ name, value = 0 }: ResultCellProps): JSX.Element {
  return (
    <ResultCell>
      <Row>
        <Icon />
        <Text>{name}</Text>
      </Row>
      <ResultProgress className="nes-progress" value={value} max="10"></ResultProgress>
    </ResultCell>
  );
}
