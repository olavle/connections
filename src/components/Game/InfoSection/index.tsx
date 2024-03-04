import styled from "styled-components";
import { SubmitSlider } from "../SubmitSlider";

const StyledInfoSection = styled.div`
  width: 100%;
`;

export const InfoSection = () => {
  return (
    <StyledInfoSection>
      <SubmitSlider />
    </StyledInfoSection>
  );
};
