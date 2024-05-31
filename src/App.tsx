import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { DarkTheme, LightTheme } from "./shared/themes";
import { AppThemeProvider } from "./shared/context/ThemeContext";
import { MenuLateral } from "./shared/components";
import { DrawerProvider } from "./shared/context";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
