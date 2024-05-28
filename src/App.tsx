import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ThemeProvider } from "@emotion/react";
import { LightTheme } from "./shared/themes";
export const App = () => {
  return (
    <ThemeProvider theme = {LightTheme}>
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>

    </ThemeProvider>
  );
};
