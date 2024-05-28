import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { DarkTheme, LightTheme } from "./shared/themes";

export const App = () => {
  return (
    <ThemeProvider theme = {DarkTheme}>
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>

    </ThemeProvider>
  );
};
