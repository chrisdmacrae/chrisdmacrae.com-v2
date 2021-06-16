import { Box } from "cdm-ui";
import React from "react";
import styles from "./Divider.module.css";

export type DividerProps = {}

export const Divider: React.VFC<DividerProps> = () => {
  return (
    <Box padding={{ y: 'lg' }} className={styles.Divider}>
      <ReplaceMeDivider />
    </Box>
  )
}

const ReplaceMeDivider = () => (
  <Box style={{ height: '0.3rem', background: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIxIiBoZWlnaHQ9IjExIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMjAgNi44QzYwLjUgMTcuNSA4My05IDEgNi44IiBzdHJva2U9IiMyNjE5MzEiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==") center/3.25em 100% repeat-x` }} />
)