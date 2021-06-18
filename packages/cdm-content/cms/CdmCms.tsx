import React, { useEffect, useMemo } from 'react';
import { Cms, CmsConfig, CmsProvider } from '@chrisdmacrae/teditor';

export type CdmCmsProviderProps = {
  config: CmsConfig
}

export const CdmCmsProvider: React.FC<CdmCmsProviderProps> = ({ config, children }) => {
  const cms = useMemo(() => new Cms(config), [JSON.stringify(config)]);
  useEffect(() => cms.enable(), []);

  return (
    <CmsProvider cms={cms}>
      {children}
    </CmsProvider>
  )
}