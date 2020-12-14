import { BlocksControls } from "react-tinacms-inline";
import { Figure, FigureVariants } from "../components/Figure";

export interface RichTextBlockProps {
  index: number;
  data: {
    variant: FigureVariants
  }
}

export function FigureBlock({ index, data }: RichTextBlockProps) {
  const { variant } = data;

  return (
    <BlocksControls index={index}>
      <Figure variant={variant} />
    </BlocksControls>
  );
}

export const FigureBlockTemplate = {
  label: 'Figure',
  key: 'figure-block',
  defaultItem: {
    variant: "regular",
  },
  fields: [
    { name: 'variant', label: 'Variant', component: 'select', options: [
      "full-width", "pull-left", "pull-right", "regular"
    ] as FigureVariants[]}
  ]
}

export default {
  Component: FigureBlock,
  template: FigureBlockTemplate
}