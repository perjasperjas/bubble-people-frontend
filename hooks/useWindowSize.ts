import { useCallback, useEffect, useState } from "react";

const MOBILE_WIDTH = 678;

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const listener = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    if (windowSize?.width && windowSize.width > MOBILE_WIDTH) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", listener);

    return window.addEventListener("resize", listener);
  }, [listener]);

  useEffect(() => {
    listener();
  }, [listener]);

  return { size: windowSize, isMobile };
};
