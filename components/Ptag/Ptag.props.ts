import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface PtagProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  textSize?: 's' | 'm' | 'l';
  children: ReactNode;
}
