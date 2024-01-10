import { MutableRefObject, useCallback, useEffect, useState } from "react";

export const useTrackMousePosition = (
  elementRef: MutableRefObject<HTMLDivElement | null>
) => {
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handler = useCallback(
    (e: MouseEvent) => {
      if (elementRect) {
        setMousePosition({
          x: (e.clientX - elementRect.left) / elementRect.width,
          y: (e.clientY - elementRect.top) / elementRect.height,
        });
      }
    },
    [elementRect]
  );

  useEffect(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setElementRect(rect);
    }
  }, [elementRef]);

  useEffect(() => {
    if (elementRect && elementRef.current) {
      elementRef.current.addEventListener("mousemove", handler);
    }

    return () => {
      elementRef.current?.removeEventListener("mousemove", handler);
    };
  }, [elementRect]);

  return { mousePosition, elementRect };
};
