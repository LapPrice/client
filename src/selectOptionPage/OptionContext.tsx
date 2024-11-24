import React, { createContext, useContext, useState } from "react";

interface OptionRequest {
  Brand: string;
  CPU: string;
  GPU: string;
  SSD: string;
  RAM: string;
  Inch: string;
}

interface OptionContextProps {
  options: OptionRequest;
  setOptions: React.Dispatch<React.SetStateAction<OptionRequest>>;
}

const OptionContext = createContext<OptionContextProps | undefined>(undefined);

export const OptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [options, setOptions] = useState<OptionRequest>({
    Brand: "Brand",
    CPU: "CPU",
    GPU: "GPU",
    SSD: "SSD",
    RAM: "RAM",
    Inch: "Inch",
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
