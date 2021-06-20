import { useEffect, useState } from 'react';
import NextImage from 'next/image';

export type ImageProps = Omit<JSX.IntrinsicElements['img'], | 'srcSet' | 'ref' | 'width' | 'height' | 'loading' | 'style'> & {
  layout?: "fill" | "fixed" | "intrinsic" | "responsive";
  width?: number;
  height?: number;
};

export const Image: React.FC<ImageProps> = (props) => {
  const { width, height, layout } = props;
  const [nativeWidth, setNativeWidth] = useState<number>();
  const [nativeHeight, setNativeHeight] = useState<number>();
  useEffect(() => {
    if (typeof width === "number" && typeof height === "number") {
      setNativeWidth(width)
      setNativeHeight(height)
    }
  })
  useEffect(() => {
    if (typeof window !== 'undefined' && !width && !height) {
      var img = document.createElement('img');

      img.src = props.src;
      
      var poll = setInterval(function () {
          if (img.naturalWidth && img.naturalHeight) {
              clearInterval(poll);
              setNativeWidth(img.naturalWidth)
              setNativeHeight(img.naturalHeight)
          }
      }, 10);    }
  }, [width, height])

  if (!nativeWidth || !nativeHeight) return null;
  
  if (layout !== 'fill') {
    return <NextImage {...props} src={props.src} width={nativeWidth} height={nativeHeight} layout={layout} />
  }

  // NextImage's types suck...
  return <NextImage {...props} src={props.src} width={undefined} height={undefined} layout={'fill' as any} />
}