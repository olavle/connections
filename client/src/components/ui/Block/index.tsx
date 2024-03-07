import styled from "styled-components";
import { IBaseProps } from "../types";
import { FC } from "react";

interface IProps extends IBaseProps {}

const StyledBlock = styled.div``;

export const Block: FC<IProps> = () => <StyledBlock></StyledBlock>;
