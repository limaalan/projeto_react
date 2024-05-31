import React, {
  createContext,
  useCallback,
  useState,
  useContext,
} from "react";

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: iDrawerOption[]
  setDrawerOptions:(newDrawerOptions : iDrawerOption[]) => void;
}
interface IDrawerProvider {
  children: React.ReactNode;
}
interface iDrawerOption{
	icon:string
	path:string
	label:string
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<IDrawerProvider> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<iDrawerOption[]>([]);


  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions= useCallback((newDrawerOptions:iDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{setDrawerOptions:handleSetDrawerOptions,isDrawerOpen,drawerOptions, toggleDrawerOpen} }>
      {children}
    </DrawerContext.Provider>
  );
};
