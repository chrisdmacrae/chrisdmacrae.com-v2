import { GetStaticProps } from 'next';
import React from 'react';
import { getGithubPreviewData } from '../../lib/cms/utils/getGithubPreviewProps';
import { kitchenSinkRelativePath, useKitchenSinkData } from '../../lib/core/routes/kitchen-sink';
import { KitchenSinkRoute } from '../../lib/core/routes/kitchen-sink/kitchen-sink';

export const KitchenSink = (props) => (
  <KitchenSinkRoute {...props} />
);

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  let props = {
    isEditing: preview ?? false,
    page: {}
  }

  if (preview || process.env.USE_REMOTE) {
    const fileProps = await getGithubPreviewData(kitchenSinkRelativePath, previewData);

    props = {
      ...props,
      page: fileProps.props
    }
  }
  else {
    props = {
      ...props,
      page: {
        error: null,
        file: {
          fileRelativePath: kitchenSinkRelativePath,
          data: (await useKitchenSinkData()).default,
        }
      }
    }
  }

  return {
    props: props
  }
}

export default KitchenSink;