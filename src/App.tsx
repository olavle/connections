import "./App.css";
import styled from "styled-components";
import { Header } from "./components/ui/Text/Header";
import { Game } from "./components/Game";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
