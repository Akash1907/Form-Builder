
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const ColorPickerContext = createContext<any>(undefined);

export function ColorPicker({ children }: { children: ReactNode }) {


  const [colorState, setColorState] = useState<any[]>([]);
  return (
    <ColorPickerContext.Provider value={{ colorState, setColorState }}>
      {children}
    </ColorPickerContext.Provider>
  );

  
}

export function useColorPickerContext() {
  return useContext(ColorPickerContext);
}

