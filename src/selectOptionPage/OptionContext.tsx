import React, { createContext, useContext, useState } from "react";

export interface OptionRequest {
  Brand: string | null;
  CPU: string | null;
  SSD: string | null;
  RAM: string | null;
  Inch: string | null;
}

interface OptionContextProps {
  options: OptionRequest;
  setOptions: React.Dispatch<React.SetStateAction<OptionRequest>>;
}


export const convertOptionToScheme = (scheme : OptionRequest) => {
 return {
  brand: scheme.Brand,
  cpuName: scheme.CPU,
  ssd: scheme.SSD,
  ram: scheme.RAM,
  inch: scheme.Inch,
 }
}

const OptionContext = createContext<OptionContextProps | undefined>(undefined);

export const OptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [options, setOptions] = useState<OptionRequest>({
    Brand: null,
    CPU: null,
    SSD: null,
    RAM: null,
    Inch: null,
  });

  return (
    <OptionContext.Provider value={{ options, setOptions }}>
      {children}
    </OptionContext.Provider>
  );
};


export const useOption = () => {
  const context = useContext(OptionContext);
  if (!context) {
    throw new Error("useOption must be used within an OptionProvider");
  }
  return context;
};
