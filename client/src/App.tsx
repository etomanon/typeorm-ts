import React from "react";
import "sanitize.css";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import { GlobalStyles } from "./theme/global";
import { theme } from "./theme/theme";
import { Router } from "./router/Router";
import { configureStore } from "./redux/store";

const store = configureStore();

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyles />
            <Router />
          </>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
