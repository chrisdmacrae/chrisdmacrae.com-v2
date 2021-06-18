import React from "react";
import { CmsUI, useCMS } from "@chrisdmacrae/teditor";

export const withPageEditing = (Component: React.FC<unknown>) => (props) => {
  const cms = useCMS();

  if (cms?.enabled || !cms?.enabled) {
    return (
      <>
        <CmsUI />
        <Component {...props} />
      </>
    )
  }

  return <Component {...props} />
}