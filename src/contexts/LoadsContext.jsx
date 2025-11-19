import React, { createContext, useState, useMemo } from "react";

export const LoadsContext = createContext({
  loads: [],
  totalPower: 0,
  totalDailyKwh: 0,
  addLoad: () => {},
  removeLoad: () => {},
});

export function LoadsProvider({ children }) {
  const [loads, setLoads] = useState([]);

  const totalPower = useMemo(
    () => loads.reduce((sum, l) => sum + (Number(l.totalWatts) || 0), 0),
    [loads]
  );

  const totalDailyKwh = useMemo(
    () => loads.reduce((sum, l) => sum + (Number(l.dailyKwh) || 0), 0),
    [loads]
  );

  const addLoad = (load) => setLoads((prev) => [...prev, load]);
  const removeLoad = (uid) =>
    setLoads((prev) => prev.filter((l) => l.uid !== uid));

  return (
    <LoadsContext.Provider
      value={{ loads, totalPower, totalDailyKwh, addLoad, removeLoad }}
    >
      {children}
    </LoadsContext.Provider>
  );
}
