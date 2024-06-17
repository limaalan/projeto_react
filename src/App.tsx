import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

import './shared/forms/TraducoesYup'
import { AppThemeProvider, AuthProvider, DrawerProvider} from "./shared/context";
import { Login, MenuLateral } from "./shared/components";

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>

        <DrawerProvider>
          <BrowserRouter>

            <MenuLateral>
              <AppRoutes/>
            </MenuLateral>
          
          </BrowserRouter>
        </DrawerProvider>

        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
