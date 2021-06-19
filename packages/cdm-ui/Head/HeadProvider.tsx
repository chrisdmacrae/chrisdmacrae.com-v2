import { createContext } from "react";
import Head from 'next/head';
import { title } from "process";

export type HeadProviderProps = {
  head?: React.FC<unknown>;
  description?: string;
  title?: string | {
    prefix?: string;
    suffix?: string;
  }
}

export const HeadContext = createContext<HeadProviderProps>({})

export const HeadProvider: React.FC<HeadProviderProps>  = ({
  head = Head,
  title = { suffix: "Chris D. Macrae" },
  children
}) => {
  return (
    <HeadContext.Provider value={{ head, title }}>
      {children}
    </HeadContext.Provider>
  )
}