import { CmsProvider } from '../lib/cms/providers/cms';
import "Mundana/assets/css/main.css";
import './_app.css';

export function App({ Component, pageProps }) {
  const isEditing = pageProps.preview || pageProps.isEditing;
  const cmsError = pageProps.error;

  return (
    <CmsProvider isEditing={isEditing} error={cmsError}>
      <Component {...pageProps} />
    </CmsProvider>
  );
}

export default App;