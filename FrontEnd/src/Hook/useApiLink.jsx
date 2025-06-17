import { useContext } from "react";
import { AppContext } from "../Dashbord/SmallComponent/AppContext";

export const useApiLink = () => {
  const context = useContext(AppContext);
  return context;
};
