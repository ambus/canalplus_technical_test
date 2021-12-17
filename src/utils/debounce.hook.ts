import { useEffect } from "react";

export const useDebounce = (
  callback: () => void,
  dependencies: Array<any> = [],
  delayMiliseconds: number
) => {
  useEffect(() => {
    const timeout = setTimeout(() => callback(), delayMiliseconds);

    return () => clearTimeout(timeout);
  }, [...dependencies, delayMiliseconds]);
};
