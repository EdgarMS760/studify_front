import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [hideNavigation, setHideNavigation] = useState(false);

  return (
    <NavigationContext.Provider value={{ hideNavigation, setHideNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationMUI = () => useContext(NavigationContext);
