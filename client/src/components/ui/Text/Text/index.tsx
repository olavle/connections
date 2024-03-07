import { FC } from "react";
import { IBaseProps } from "../../types";
import styled from "styled-components";

interface IProps extends IBaseProps {}

const StyledText = styled.p``;

export const Text: FC<IProps> = ({ children }) => (
  <StyledText>{children}</StyledText>
);
