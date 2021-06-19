import 'cdm-ui/index.css';
import { CdmCmsProvider } from 'cdm-content/cms';
import { ThemeProvider } from "cdm-ui/Theme/Theme"
import CmsConfig from '../cms.config';
import { HeadProvider } from 'cdm-ui/Head';

export const Website = ({ pageProps, Component }) => {
  return (
    <ThemeProvider>
      <HeadProvider 
        title="Chris D. MacRae" 
        description="An island man with too much time to read books, drink posh coffee, and think hard about not thinking"
      >
      {/* <CdmCmsProvider config={CmsConfig}> */}
        <Component {...pageProps} />
      {/* </CdmCmsProvider> */}
      </HeadProvider>
    </ThemeProvider>
  )
}

export default Website;