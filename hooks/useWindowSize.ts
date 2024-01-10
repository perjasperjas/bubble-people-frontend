import { useCallback, useEffect, useState } from "react";

const MOBILE_WIDTH = 678;

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const listener = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", listener);

    return window.addEventListener("resize", listener);
  }, [listener]);

  useEffect(() => {
    listener();
  }, [listener]);

  return {
    size: windowSize,
    isMobile: windowSize
      ? windowSize.width < MOBILE_WIDTH
        ? true
        : false
      : null,
  };
};
