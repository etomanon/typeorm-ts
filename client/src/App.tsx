import React from "react";
import "sanitize.css";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "./theme/global";
import { theme } from "./theme/theme";
import { Router } from "./router/Router";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <Router />
        </>
      </ThemeProvider>
    </>
  );
};

export default App;
