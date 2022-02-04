import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

const useStateData = () => {
  return useContext(DataContext);
};

export default useStateData;
