import { useGithubAuthRedirect } from 'react-tinacms-github'

export default function Authorizing() {
  useGithubAuthRedirect()

  return <h2>Authorizing with GitHub, please wait...</h2>
}