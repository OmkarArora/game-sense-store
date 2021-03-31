import { createContext, useContext } from "react";
import { data } from "./mockData";

const PlaystationContext = createContext();

export const usePlaystation = () => useContext(PlaystationContext);

export const PlaystationProvider = ({ children }) => {
  const value = { data: data };
  return (
    <PlaystationContext.Provider value={value}>
      {children}
    </PlaystationContext.Provider>
  );
};
