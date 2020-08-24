import { useEffect, useState } from "react";

export function useColorScheme(defaultScheme: "dark" | "light") {
  const [scheme, setScheme] = useState(defaultScheme);
 
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const setDark = (prefersDark: boolean) => prefersDark ? setScheme("dark") : setScheme("light");
    const setDarkOnEvent = (event) => {
      const prefersDark = event.matches;

      setDark(prefersDark);
    }

    if (mq) {
      const prefersDark = mq.matches;
      
      mq.addEventListener
        ? mq.addEventListener("change", (event) => setDarkOnEvent(event))
        : mq.addListener((event) => setDarkOnEvent(event));

      setDark(prefersDark);
    }

    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", setDarkOnEvent)
        : mq.removeListener(setDarkOnEvent);
    }
  })

  
  return [scheme, setScheme];
}