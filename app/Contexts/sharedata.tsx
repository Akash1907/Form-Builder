
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {


  const [state, sharesetState] = useState<any[]>([]);
  return (
    <AppContext.Provider value={{ state, sharesetState }}>
      {children}
    </AppContext.Provider>
  );

  
}

export function useAppContext() {
  return useContext(AppContext);
}

