import { GetStaticProps } from 'next';
import { getGithubPreviewData, kitchenSinkRelativePath, useKitchenSinkData, KitchenSinkRoute } from 'cdm-ui';

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
          data: (await useKitchenSinkData()),
        }
      }
    }
  }

  return {
    props: props
  }
}

export default KitchenSinkRoute;