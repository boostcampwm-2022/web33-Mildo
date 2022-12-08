import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { createGlobalStyle } from 'styled-components';
import MapLoading from './components/MapLoading/MapLoading';
import MainPage from './pages/MainPage/MainPage';

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

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Suspense fallback={<MapLoading />}>
          <MainPage />
        </Suspense>
      </QueryClientProvider>
    </>
  );
}

export default App;
