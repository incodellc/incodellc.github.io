import React from "react";
import { DevInfoContext } from "./DevInfoContext";
import { TDeveloperInfo } from "../../types/TDevelopersInfo";

export default function DevInfoProvider({ children }: React.PropsWithChildren) {
  const [devInfo, setDevInfo] = React.useState<TDeveloperInfo | undefined>(undefined);

  return <DevInfoContext.Provider value={{ devInfo, setDevInfo }}>{children}</DevInfoContext.Provider>;
}
