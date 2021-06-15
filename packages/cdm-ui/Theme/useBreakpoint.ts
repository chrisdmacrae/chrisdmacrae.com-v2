import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "./Theme";

export type Breakpoints = {
  [key: string]: number;
}

export type BuiltInBreakpoints = Breakpoints & {
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
  xxl: number
}

export const useBreakpoints = <BreakpointsShape = Breakpoints>(scopedBreakpoints?: BreakpointsShape) => {
  const theme = useContext(ThemeContext);
  const breakpoints = { ...theme.breakpoints, ...(scopedBreakpoints || {}) };
  const [currentViewport, setCurrentViewport] = useState(0);
  useEffect(() => setCurrentViewport(getViewport()), []);
  useEffect(() => {
    let timeout;

    window.addEventListener('resize', () => {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }

      timeout = window.requestAnimationFrame(() => {
        setCurrentViewport(getViewport());
      });
    });
  }, []);

  return Object.keys(breakpoints).reduce((bpState, name) => {
    if (breakpoints[name] <= currentViewport) bpState[name] = true;
    else bpState[name] = false;

    return bpState;
  }, {}) as BuiltInBreakpoints & BreakpointsShape;
}

const getViewport = () => {
  if (typeof window !== 'undefined') {
    return window.document.body.getBoundingClientRect().width;
  }

  return 0;
}