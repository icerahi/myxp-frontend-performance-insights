import { createContext, useState } from "react";

const DataStore = () => {
  const [tests, setTests] = useState([]);
  const [venues, setVenues] = useState([]);

  return { tests, setTests, venues, setVenues };
};


export const DataContext = createContext();
const DataProvider = ({ children }) => {
  return (
    <DataContext.Provider value={DataStore()}>{children}</DataContext.Provider>
  );
};
export default DataProvider;
