import { CmsProvider } from '../lib/cms/providers/cms';
import { useCMS } from 'tinacms';
import "Mundana/assets/css/main.css";
import "./_app.css";
import { useColorScheme } from '../lib/core/hooks/useColorScheme';
import { AppStateProvider } from '../lib/core/state/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const isEditing = pageProps.isEditing ?? pageProps.preview ?? false;
  const cmsError = pageProps.error;
  let [scheme, setScheme] = useColorScheme("light");

  const WrapperClasses = ({children}) => {
    const cms = useCMS();
    const isEditing = cms.enabled;
    const classNames = [];

    classNames.push(isEditing ? "is-editing" : "is-not-editing");

    return (
      <div className={classNames.join(" ")}>
        {children}
      </div>
    )
  }

  // We set scheme classes on html, in order to get full styling control...
  useEffect(() => {
    const isDark = scheme === "dark";

    if (isDark) {
      document.documentElement.classList.add("is-dark");
      document.documentElement.classList.remove("is-light");
    } else {
      document.documentElement.classList.remove("is-dark");
      document.documentElement.classList.add("is-light");
    }
  }, [scheme]);

  return (
    <CmsProvider isEditing={isEditing} error={cmsError}>
      <AppStateProvider value={{
        colorScheme: scheme,
        setColorScheme: setScheme
      }}>
        <WrapperClasses>
          <Component {...pageProps} />
        </WrapperClasses>
      </AppStateProvider>
    </CmsProvider>
  );
}