import { useGithubEditing } from "react-tinacms-github"

export interface EditLinkProps {
  editMode: boolean
}

export const EditLink = ({ editMode }: EditLinkProps) => {
  const github = useGithubEditing()

  return (
    <button onClick={editMode ? github.exitEditMode : github.enterEditMode}>
      {editMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}