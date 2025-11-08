import { useState, useContext, createContext } from "react";

const TabsContext = createContext();

export const TabProvider = ({ children, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTab = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Context doesnt exist");
  }
  return context;
};
