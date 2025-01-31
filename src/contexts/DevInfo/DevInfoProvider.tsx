import React from "react";
import { DevInfoContext } from "./DevInfoContext";
import { TDeveloperInfo } from "../../types/TDevelopersInfo";

export default function DevInfoProvider({ children }: React.PropsWithChildren) {
  const [devInfo, setDevInfo] = React.useState<TDeveloperInfo | null>(null);

  return <DevInfoContext.Provider value={{ devInfo, setDevInfo }}>{children}</DevInfoContext.Provider>;
}
