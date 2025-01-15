import {createContext, useState, useContext} from "react";

const GridContext = createContext();

export function GridProvider({children}) {
  const [view, setView] = useState("list");

  const toggleView = () => {
    setView(view === "list" ? "grid" : "list");
  };

  return (
    <GridContext.Provider value={{view, toggleView}}>
      {children}
    </GridContext.Provider>
  );
}

export const useGrid = () => useContext(GridContext);
