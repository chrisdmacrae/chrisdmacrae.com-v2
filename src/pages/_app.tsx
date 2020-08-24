import { CmsProvider } from '../lib/cms/providers/cms';
import { useCMS } from 'tinacms';
import "Mundana/assets/css/main.css";
import "./_app.css";

export default function App({ Component, pageProps }) {
  const isEditing = pageProps.isEditing ?? pageProps.preview ?? false;
  const cmsError = pageProps.error;

  const IsEditing = ({children}) => {
    const cms = useCMS();
    const isEditing = cms.enabled;

    return (
      <div className={isEditing ? "is-editing" : "is-not-editing"}>
        {children}
      </div>
    )
  }

  return (
    <CmsProvider isEditing={isEditing} error={cmsError}>
      <IsEditing>
        <Component {...pageProps} />
      </IsEditing>
    </CmsProvider>
  );
}