import { FC } from "react";
import styled from "styled-components";
import { IBaseProps } from "../../types";

interface IProps extends IBaseProps {}

const StyledHeader = styled.h1``;

export const Header: FC<IProps> = ({ children }) => (
  <StyledHeader>{children}</StyledHeader>
);
