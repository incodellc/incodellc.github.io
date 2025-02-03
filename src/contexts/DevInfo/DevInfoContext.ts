import React from "react";
import { TDeveloperInfo } from "../../types/TDevelopersInfo";

interface DevInfoContextType {
  devInfo: TDeveloperInfo | undefined;
  setDevInfo: (info: TDeveloperInfo | undefined) => void;
}

export const DevInfoContext = React.createContext<DevInfoContextType>({
  devInfo: undefined,
  setDevInfo: () => {},
});
