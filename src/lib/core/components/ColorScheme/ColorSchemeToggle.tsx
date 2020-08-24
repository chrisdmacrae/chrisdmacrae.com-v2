import { useContext } from "react"
import AppStateContext from "../../state/app"
import styles from "./ColorSchemeToggle.module.css";

export function ColorSchemeToggle(props) {
  const { colorScheme, setColorScheme } = useContext(AppStateContext);
  const isDark = colorScheme === "dark";

  return (
    <label className={`${styles["toggle"]} ${isDark ? styles["sun"] : styles["moon"]}`} {...props}>
      <input
        type="checkbox"
        className={`${styles["toggle-checkbox"]}`}
        checked={isDark}
        onChange={() => setColorScheme(isDark ? "light" : "dark")}
      />
      <div className={`${styles["toggle-btn"]}`}></div>
    </label>
  )
}