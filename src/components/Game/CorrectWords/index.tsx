import styled from "styled-components";
import { BoardWord } from "../BoardWord";
import { useGameBoardContext } from "../GameBoardContext";
import { WordGrid } from "../WordGrid";
import { groupWordsByCategory } from "../lib/lib";
import { Text } from "../../ui";

const StyledCorrectWords = styled.div`
  margin-bottom: 1rem;
`;

export const CorrectWords = () => {
  const { correctWords } = useGameBoardContext();

  if (!correctWords.length) {
    return null;
  }

  const groupedWords = groupWordsByCategory(correctWords);

  return (
    <>
      {groupedWords.map((group, i) => (
        <StyledCorrectWords key={`${group}_${i}`}>
          <WordGrid words={group} rows={1} />
          <Text>{group[0].categoryId}</Text>
        </StyledCorrectWords>
      ))}
    </>
  );
};
