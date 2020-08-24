import { useEffect, useState } from "react";
import { ColorSchemes, SetColorScheme } from "../state/app";

export function useColorScheme(defaultScheme: ColorSchemes): [ColorSchemes, SetColorScheme] {
  const [scheme, setScheme] = useState(defaultScheme);
  const setDark = (prefersDark: boolean) => prefersDark ? setScheme("dark") : setScheme("light");
  const setDarkOnEvent = (event) => {
    const prefersDark = event.matches;

    setDark(prefersDark);
  }
  let mq: MediaQueryList;
 
  useEffect(() => {
    if ("matchMedia" in window) {
      mq = window.matchMedia('(prefers-color-scheme: dark)');

      if (mq) {
        const prefersDark = mq.matches;
        
        mq.addEventListener
          ? mq.addEventListener("change", (event) => setDarkOnEvent(event))
          : mq.addListener((event) => setDarkOnEvent(event));

        setDark(prefersDark);
      }
    }

    return () => {
      if (mq) {
        mq.removeEventListener
          ? mq.removeEventListener("change", setDarkOnEvent)
          : mq.removeListener(setDarkOnEvent);
      }
    }
  }, [])

  
  return [scheme, setScheme];
}