import { useState, useEffect } from "react";

export interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial size
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();

    // Listen to resize events
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

/**
 * Hook to detect if the current viewport is mobile size
 * @param breakpoint Width breakpoint in pixels (default: 768px)
 * @returns true if viewport is smaller than breakpoint
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const { width } = useWindowSize();
  return width < breakpoint;
}
