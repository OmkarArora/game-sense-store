import { createContext, useContext, useState } from "react";

const NavPhoneContext = createContext();
export const useNavPhone = () => useContext(NavPhoneContext);

export const NavPhoneProvider = ({ children }) => {
  const [navPhoneVisible, setNavPhoneVisibility] = useState(false);
  const value = { navPhoneVisible, setNavPhoneVisibility };
  return (
    <NavPhoneContext.Provider value={value}>
      {children}
    </NavPhoneContext.Provider>
  );
};
