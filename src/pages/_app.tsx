import 'cdm-ui/index.css';
import { CdmCmsProvider } from 'cdm-content/cms';
import { ThemeProvider } from "cdm-ui/Theme/Theme"
import CmsConfig from '../cms.config';

export const Website = ({ pageProps, Component }) => {
  return (
    <ThemeProvider>
      {/* <CdmCmsProvider config={CmsConfig}> */}
        <Component {...pageProps} />
      {/* </CdmCmsProvider> */}
    </ThemeProvider>
  )
}

export default Website;