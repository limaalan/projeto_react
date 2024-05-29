import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { DarkTheme, LightTheme } from "./shared/themes";
import { AppThemeProvider } from "./shared/context/ThemeContext";
import { MenuLateral } from "./shared/components";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <MenuLateral>
          <AppRoutes />
		</MenuLateral>
      </BrowserRouter>
    </AppThemeProvider>
  );
};
