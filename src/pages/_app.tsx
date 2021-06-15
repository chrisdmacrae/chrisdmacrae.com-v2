import 'cdm-ui/index.css';
import { ThemeProvider } from "cdm-ui/Theme/Theme"

export const Website = ({ pageProps, Component }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default Website;