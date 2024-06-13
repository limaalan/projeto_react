import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

import './shared/forms/TraducoesYup'
import { AppThemeProvider, DrawerProvider} from "./shared/context";
import { MenuLateral } from "./shared/components";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes/>
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
