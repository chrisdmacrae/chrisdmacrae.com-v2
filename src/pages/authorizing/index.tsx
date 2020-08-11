import { useGithubAuthRedirect } from 'react-tinacms-github'
import { PopupLayout } from '../../lib/core/layouts/Popup'

export default function Authorizing() {
  const page = {
    title: "Authorizing",
    description: "Authorizing you for editing..."
  }
  useGithubAuthRedirect()

  return (
    <PopupLayout page={page}>
      <h2>Authorizing with GitHub, please wait...</h2>
    </PopupLayout>
  );
}