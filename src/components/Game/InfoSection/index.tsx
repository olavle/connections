import styled from "styled-components";
import { SubmitSlider } from "../SubmitSlider";
import { Button } from "../../ui/Button";
import { useGameBoardContext } from "../GameBoardContext";

const StyledInfoSection = styled.div`
  padding: 1rem;
`;

export const InfoSection = () => {
  const { checkIsCorrectWords, wrongAnswers } = useGameBoardContext();

  const handleCheckResult = () => {
    checkIsCorrectWords();
  };
  return (
    <StyledInfoSection>
      <Button action={handleCheckResult} fullWidth>
        Check
      </Button>
    </StyledInfoSection>
  );
};
