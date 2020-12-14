import { stringify } from 'querystring';
import { Button as BootstrapButton } from 'react-bootstrap';
import { InlineText } from 'react-tinacms-inline';
import { useCMS } from 'tinacms';

export const Button = BootstrapButton;

export type EditableButtonProps = {
  name: string;
} & {
  [key: string]: any
}

export function EditableButton(props: EditableButtonProps) {
  const cms = useCMS();
  const isEditing = cms.enabled;
  let children = props.children; 

  if (isEditing) {
    children = <InlineText name={props.name} />
  }

  return (
    <Button {...props}>
      {children}
    </Button>
  )
}