import { createContext, useState } from "react";
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [state, setState] = useState({ port: "http://localhost:5002" });
  // const [state, setState] = useState({ port: "https://api.tojonews.com" });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
