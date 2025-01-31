import * as React from "react";
import { DevInfoContext } from "./DevInfoContext";

export function useDevInfo() {
  return React.useContext(DevInfoContext);
}
