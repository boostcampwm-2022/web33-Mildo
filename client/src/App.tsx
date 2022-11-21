import { createGlobalStyle } from 'styled-components';
import Map from './components/Map';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0px;
        padding: 0px;
    }

    body {
        font-family: "Noto Sans KR", "Helvetica", "Arial", sans-serif;
        line-height: 1.5;
    }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Map />
    </>
  );
}

export default App;
