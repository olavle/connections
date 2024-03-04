import "./App.css";
import styled from "styled-components";
import { Header } from "./components/ui/Text/Header";
import { Game } from "./components/Game";
import { SubmitSlider } from "./components/Game/SubmitSlider";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const App = () => {
  return (
    <StyledApp>
      <Header>Connections</Header>
      <Game />
    </StyledApp>
  );
};

export default App;
