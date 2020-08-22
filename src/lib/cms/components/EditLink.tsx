import { useGithubEditing } from "react-tinacms-github"

export interface EditLinkProps {
  editMode: boolean
}

export const EditLink = ({ editMode }: EditLinkProps) => {
  const github = useGithubEditing()

  return (
    <span onClick={editMode ? github.exitEditMode : github.enterEditMode}>
      {editMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </span>
  )
}