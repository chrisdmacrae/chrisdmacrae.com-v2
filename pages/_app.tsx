import React, { useEffect } from 'react';
import { useCMS } from 'tinacms';
import { CmsProvider } from 'cdm-ui';
import { useColorScheme } from 'cdm-ui';
import { AppStateProvider, ColorSchemes } from 'cdm-ui';
import { useIsomorphicLayoutEffect } from 'cdm-ui';
import "Mundana/assets/css/main.css";
import "./_app.css";

export default function App({ Component, pageProps }) {
  const isEditing = pageProps.isEditing ?? pageProps.preview ?? false;
  const cmsError = pageProps.error;
  const [scheme, setScheme] = useColorScheme("light");
  const setColorScheme = (scheme: ColorSchemes) => {
    if (global && global.localStorage) {
      global.localStorage.setItem("cdm-color-scheme", JSON.stringify({
        value: scheme,
        time: new Date().getTime()
      }));

      setScheme(scheme);
    }
  }
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

  // We set scheme from persisted localstorage value if present
  useIsomorphicLayoutEffect(() => {
    if (global && global.localStorage) {
      try {
        const scheme = JSON.parse(global.localStorage.getItem("cdm-color-scheme"));
        const time = new Date().getTime() - (1000 * 60 * 60); // 1 hour

        if (scheme && scheme.value && scheme.time && scheme.time > time) {
          setScheme(scheme.value);
        }
      } catch (error) {
        global.localStorage.removeItem("cdm-color-scheme");
      }
    }
  })

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
        setColorScheme: setColorScheme
      }}>
        <WrapperClasses>
          <Component {...pageProps} />
        </WrapperClasses>
      </AppStateProvider>
    </CmsProvider>
  );
}