import React from "react";
import { TDeveloperInfo } from "../../types/TDevelopersInfo";

interface DevInfoContextType {
  devInfo: TDeveloperInfo | null;
  setDevInfo: (info: TDeveloperInfo) => void;
}

export const DevInfoContext = React.createContext<DevInfoContextType | undefined>(undefined);
