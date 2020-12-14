import { useGithubAuthRedirect } from 'react-tinacms-github'
import { PopupLayout } from 'cdm-ui';

export default function Authorizing() {
  const seo = {
    title: "Authorizing",
    description: "Authorizing you for editing..."
  }
  useGithubAuthRedirect()

  return (
    <PopupLayout seo={seo}>
      <h2>Authorizing with GitHub, please wait...</h2>
    </PopupLayout>
  );
}