import { createContext, useContext, useState } from "react";

// Create Context
const SearchContext = createContext();

// Provider component
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
export const useSearch = () => useContext(SearchContext);

